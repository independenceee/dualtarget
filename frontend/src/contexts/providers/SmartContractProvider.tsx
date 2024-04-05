"use client";

import { Data, Lucid, TxHash, TxSigned, UTxO, Credential, OutputData, C, Lovelace, Address } from "lucid-cardano";
import React, { ReactNode, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { ClaimableUTxO, CalculateSellingStrategy } from "~/types/GenericsType";
import calculateSellingStrategy from "~/utils/calculate-selling-strategy";
import { DualtargetDatum } from "~/constants/datum";
import readValidator from "~/utils/read-validator";
import { refundRedeemer } from "~/constants/redeemer";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const [txHashDeposit, setTxHashDeposit] = useState<TxHash>("");
    const [txHashWithdraw, setTxHashWithdraw] = useState<TxHash>("");
    const [waitingDeposit, setWaitingDeposit] = useState<boolean>(false);
    const [waitingWithdraw, setWaitingWithdraw] = useState<boolean>(false);

    const deposit = async function ({
        lucid,
        income,
        priceHight,
        priceLow,
        stake,
        step,
        totalADA,
    }: {
        lucid: Lucid;
        income: number;
        priceHight: number;
        priceLow: number;
        stake: number;
        step: number;
        totalADA: number;
    }) {
        try {
            setWaitingDeposit(true);

            const sellingStrategies: CalculateSellingStrategy[] = calculateSellingStrategy({
                income: income, // Bao nhiêu $ một tháng ==> Nhận bao nhiêu dola 1 tháng = 5
                priceHigh: priceHight * 1000000, //  Giá thấp nhất =  2000000
                priceLow: priceLow * 1000000, // Giá cao nhất = 1000000
                stake: stake, //  ROI % stake theo năm = 5
                step: step, // Bước nhảy theo giá (%) = 10
                totalADA: totalADA * 1000000, // Tổng ada = 24000000
            });

            console.log("Selling: ", sellingStrategies);

            const contractAddress: string = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
            const vkeyOwnerHash: string = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash as string;
            const vkeyBeneficiaryHash: string = lucid.utils.getAddressDetails(contractAddress).paymentCredential?.hash as string;

            const datums: any[] = sellingStrategies.map(function (sellingStrategy: CalculateSellingStrategy, index: number) {
                return Data.to<DualtargetDatum>(
                    {
                        odOwner: vkeyOwnerHash,
                        odBeneficiary: vkeyBeneficiaryHash,
                        assetA: {
                            policyId: "",
                            assetName: "",
                        },
                        amountA: BigInt(sellingStrategy.amountSend),
                        assetOut: {
                            policyId: "e16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed72",
                            assetName: "4d494e",
                        },
                        minimumAmountOut: BigInt(sellingStrategy.minimumAmountOut),
                        minimumAmountOutProfit: BigInt(sellingStrategy.minimumAmountOutProfit),
                        buyPrice: BigInt(sellingStrategy.buyPrice),
                        sellPrice: BigInt(sellingStrategy.sellPrice),
                        odstrategy: "414441444a4544",
                        BatcherFee: BigInt(1500000),
                        OutputADA: BigInt(6000000),
                        fee_address: "849bb882b0999fe8eee3190d53a1dc46fd707c41859f4973aec84cc0",
                        validator_address: "ecc575c43fe93b158e02a176c9159afe681cd097910748fde50d33a7",
                        deadline: BigInt(new Date().getTime() + 10 * 1000),
                        isLimitOrder: BigInt(0),
                    },
                    DualtargetDatum,
                );
            });

            console.log("datum " + datums);

            /////////////////////////////////////////////////////////
            let tx: any = lucid.newTx();

            sellingStrategies.forEach(async function (sellingStrategy: CalculateSellingStrategy, index: number) {
                tx = await tx.payToContract(
                    contractAddress,
                    {
                        inline: datums[index],
                    },
                    {
                        lovelace: BigInt(sellingStrategy.amountSend),
                    },
                );
            });

            tx = await tx.complete();

            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) setTxHashDeposit(txHash);
            /////////////////////////////////////////////////////////
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingDeposit(false);
        }
    };

    const withdraw = async function ({ lucid }: { lucid: Lucid }) {
        try {
            setWaitingWithdraw(false);
            const paymentAddress: string = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash as string;
            const contractAddress: string = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
            const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress);

            const validator = readValidator();
            let smartcontractUtxo: UTxO = null!;

            const claimableUtxos: ClaimableUTxO[] = [];
            for (const scriptUtxo of scriptUtxos) {
                if (scriptUtxo.scriptRef?.script) {
                    smartcontractUtxo = scriptUtxo;
                } else if (scriptUtxo.datum) {
                    const outputDatum: any = Data.from(scriptUtxo.datum!);
                    console.log(outputDatum);
                    const params = {
                        odOwner: outputDatum.fields[0],
                        odBeneficiary: outputDatum.fields[1],
                        assetA: {
                            policyId: "",
                            assetName: "",
                        },
                        amountA: outputDatum.fields[3],
                        assetOut: {
                            policyId: "e16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed72",
                            assetName: "4d494e",
                        },
                        minimumAmountOut: outputDatum.fields[5],
                        minimumAmountOutProfit: outputDatum.fields[6],
                        buyPrice: outputDatum.fields[7],
                        sellPrice: outputDatum.fields[8],
                        odstrategy: outputDatum.fields[9],
                        BatcherFee: outputDatum.fields[10],
                        OutputADA: outputDatum.fields[11],
                        fee_address: "849bb882b0999fe8eee3190d53a1dc46fd707c41859f4973aec84cc0",
                        validator_address: outputDatum.fields[13],
                        deadline: outputDatum.fields[14],
                        isLimitOrder: outputDatum.fields[15],
                    };

                    /**
                     * 1. Lấy tất cả
                     * 2. Lấy UTXO DJED
                     * 3. Lấy UTXO Profit
                     */

                    if (
                        String(params.odOwner) === String(paymentAddress) // Lấy tất cả =  Djed + Profit
                        // Number(scriptUtxo.assets.lovelace) => 113590909 && Number(scriptUtxo.assets.lovelace) <= 113590909 // UTXO djed // Lấy Djed
                        // Number(params.isLimitOrder) === 0 // UTXO profit (chua co)
                    ) {
                        let winter_addr: Credential = { type: "Key", hash: params.fee_address };
                        const freeAddress1 = lucid.utils.credentialToAddress(winter_addr);

                        claimableUtxos.push({
                            utxo: scriptUtxo,
                            BatcherFee_addr: String(freeAddress1),
                            fee: params.BatcherFee,
                            minimumAmountOut: params.minimumAmountOut, // Số lượng profit
                            minimumAmountOutProfit: params.minimumAmountOutProfit,
                        });
                    }
                }
            }

            if (!smartcontractUtxo) {
                console.log("Reference UTxO not found!");
                return;
            }

            if (claimableUtxos.length === 0) {
                console.log("No utxo to claim!");
                return;
            }

            let tx: any = lucid.newTx().readFrom([smartcontractUtxo]);
            for (const utxoToSpend of claimableUtxos) {
                tx = await tx.collectFrom([utxoToSpend.utxo], refundRedeemer);
            }
            tx = await tx
                .payToAddress(claimableUtxos[0].BatcherFee_addr, { lovelace: BigInt(1500000) as Lovelace })
                .addSigner((await lucid.wallet.address()) as Address)
                .complete();

            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) setTxHashWithdraw(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingWithdraw(true);
        }
    };
    return (
        <SmartContractContext.Provider value={{ deposit, withdraw, txHashDeposit, txHashWithdraw, waitingDeposit, waitingWithdraw }}>
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
