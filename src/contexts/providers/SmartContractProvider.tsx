"use client";

import { Data, Lucid, TxHash, TxSigned, UTxO, C } from "lucid-cardano";
import React, { ReactNode, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { ClaimableUTxO, SellingStrategyResult } from "~/types/GenericsType";
import calculateSellingStrategy from "~/utils/calculate-selling-strategy";
import { DualtargetDatum } from "~/constants/datum";
import readValidator from "~/utils/read-validator";
import { refundRedeemer } from "~/constants/redeemer";
import historyPrice from "~/utils/history-price";
type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const [txHashDeposit, setTxHashDeposit] = useState<TxHash>("");
    const [txHashWithdraw, setTxHashWithdraw] = useState<TxHash>("");
    const [waitingDeposit, setWaitingDeposit] = useState<boolean>(false);
    const [waitingWithdraw, setWaitingWithdraw] = useState<boolean>(false);

    const deposit = async function ({ lucid }: { lucid: Lucid }) {
        await historyPrice();
        try {
            setWaitingDeposit(true);
            const contractAddress: string = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
            const vkeyOwnerHash: string = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash as string;
            const vkeyBeneficiaryHash: string = lucid.utils.getAddressDetails(contractAddress).paymentCredential?.hash as string;
            const sellingStrategies: SellingStrategyResult[] = calculateSellingStrategy({
                income: 5,
                price_H: 2000000,
                price_L: 1000000,
                stake: 5,
                step: 10,
                total_ADA: 24000000,
            });

            console.log(sellingStrategies);
            const datums: any[] = sellingStrategies.map(function (sellingStrategy: SellingStrategyResult, index: number) {
                return Data.to<DualtargetDatum>(
                    {
                        odOwner: vkeyOwnerHash,
                        odBeneficiary: vkeyBeneficiaryHash,
                        assetA: {
                            policyId: "",
                            assetName: "",
                        },
                        amountA: BigInt(sellingStrategy.amount_send),
                        assetOut: {
                            policyId: "",
                            assetName: "",
                        },
                        minimumAmountOut: BigInt(sellingStrategy.minimumAmountOut),
                        minimumAmountOutProfit: BigInt(sellingStrategy.minimumAmountOutProfit),
                        buyPrice: BigInt(sellingStrategy.buyPrice),
                        sellPrice: BigInt(sellingStrategy.sellPrice),
                        odstrategy: "414441444a4544",
                        BatcherFee: BigInt(1),
                        OutputADA: BigInt(10000000),
                        fee_address: "7d9bac6e1fe750ddfc81eee27de78d13f80d93cf59e13e356913649a",
                        validator_address: "ecc575c43fe93b158e02a176c9159afe681cd097910748fde50d33a7",
                        deadline: BigInt(new Date().getTime() + 10 * 1000),
                        isLimitOrder: BigInt(0),
                    },
                    DualtargetDatum,
                );
            });

            let tx: any = lucid.newTx();

            sellingStrategies.forEach(async function (sellingStrategy, index: number) {
                console.log(sellingStrategy);
                tx = await tx.payToContract(contractAddress, { inline: datums[index] }, { lovelace: BigInt(sellingStrategy.amount_send) });
            });

            tx = await tx.complete();
            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) setTxHashDeposit(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingDeposit(false);
        }
    };

    const withdraw = async function ({ lucid }: { lucid: Lucid }) {
        try {
            console.log("withdraw");
            setWaitingWithdraw(false);
            const paymentAddress: string = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash as string;
            const contractAddress: string = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
            const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress);

            const validator = readValidator();
            let smartcontractUtxo: any = "";

            const claimableUtxos: ClaimableUTxO[] = [];
            for (const scriptUtxo of scriptUtxos) {
                if (scriptUtxo.scriptRef?.script) {
                    smartcontractUtxo = scriptUtxo;
                } else if (scriptUtxo.datum) {
                    const outputDatum: any = Data.from(scriptUtxo.datum!);

                    const params = {
                        odOwner: outputDatum.fields[0],
                        odBeneficiary: outputDatum.fields[1],
                        assetA: {
                            policyId: "",
                            assetName: "",
                        },
                        amountA: outputDatum.fields[3],
                        assetOut: {
                            policyId: "",
                            assetName: "",
                        },
                        minimumAmountOut: outputDatum.fields[5],
                        minimumAmountOutProfit: outputDatum.fields[6],
                        buyPrice: outputDatum.fields[7],
                        sellPrice: outputDatum.fields[8],
                        odstrategy: outputDatum.fields[9],
                        BatcherFee: outputDatum.fields[10],
                        OutputADA: outputDatum.fields[11],
                        fee_address: outputDatum.fields[12],
                        validator_address: outputDatum.fields[13],
                        deadline: outputDatum.fields[14],
                        isLimitOrder: outputDatum.fields[15],
                    };
                    console.log(Number(Number(params.OutputADA) / 2));

                    /**
                     * 1. Lấy tất cả
                     * 2. Lấy UTXO DJED
                     * 3. Lấy UTXO Profit
                     */
                    if (
                        String(params.odOwner) === String(paymentAddress)
                        // Number(scriptUtxo.assets.lovelace) === 113590909 // UTXO djed
                        // Number(params.isLimitOrder) === 0 // UTXO profit (chua co)
                    ) {
                        claimableUtxos.push({
                            utxo: scriptUtxo,
                            BatcherFee_addr: String(params.fee_address),
                            fee: params.BatcherFee,
                            minimumAmountOut: params.minimumAmountOut, // Số lượng profit
                            minimumAmountOutProfit: params.minimumAmountOutProfit,
                        });
                    }
                }
            }

            console.log(smartcontractUtxo);

            if (!smartcontractUtxo) {
                console.log("Reference UTxO not found!");
                return;
            }

            if (claimableUtxos.length === 0) {
                console.log("No utxo to claim!");
                return;
            }
            // const nftUtxo: any[] = [];
            // let nonNftUtxo: any = null;
            // const nonNftUtxoSpend: UTxO[] = [];
            // const utxos: Array<UTxO> = await lucid.utxosAt(await lucid.wallet.address());
            // console.log(utxos);
            // for (const utxo of utxos) {
            //     if (BigInt(utxo.assets.lovelace) >= BigInt(4000000) && BigInt(utxo.assets.lovelace) < BigInt(6000000)) {
            //         nonNftUtxo = { utxo: utxo };
            //     } else if (!utxo.assets) {
            //         nonNftUtxoSpend.push(utxo);
            //     } else {
            //         nftUtxo.push(utxo);
            //     }
            // }
            // if (!nonNftUtxo) {
            //     console.log("No collateral UTxOs found!");
            //     return;
            // }

            console.log(claimableUtxos);
            let tx: any = lucid.newTx();
            for (const utxoToSpend of claimableUtxos) {
                console.log(utxoToSpend);

                tx = await tx.collectFrom([utxoToSpend.utxo], refundRedeemer); // Redeemer
            }
            tx = await tx
                .payToAddress("addr_test1vp7ehtrwrln4ph0us8hwyl0835flsrvneav7z034dyfkfxsn4kukl", BigInt(Number(1500000)))
                .addSigner(await lucid.wallet.address())
                .attachSpendingValidator(validator)
                .complete();
            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success = await lucid.awaitTx(txHash);
            if (success) setTxHashWithdraw(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingWithdraw(true);
        }
    };
    return <SmartContractContext.Provider value={{ deposit, withdraw }}>{children}</SmartContractContext.Provider>;
};

export default SmartContractProvider;
