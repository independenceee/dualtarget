"use client";

import { Data, Lucid, Redeemer, Script, TxHash, TxSigned, UTxO } from "lucid-cardano";
import React, { ReactNode, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import convertAddressToPublicKey from "~/helpers/convert-address-to-public-key";
import { ClaimableUTxO, DaultargetParams, ResultItem } from "~/types/GenericsType";
import calculateSellingStrategy from "~/utils/calculate-selling-strategy";
import { DualtargetDatum } from "~/constants/datum";
import { RefundRedeemer } from "~/constants/redeemer";
import readValidator from "~/utils/read-validator";
type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const [txHashDeposit, setTxHashDeposit] = useState<TxHash>("");
    const [txHashWithdraw, setTxHashWithdraw] = useState<TxHash>("");
    const [waitingDeposit, setWaitingDeposit] = useState<boolean>(false);
    const [waitingWithdraw, setWaitingWithdraw] = useState<boolean>(false);

    const deposit = async function ({ lucid }: { lucid: Lucid }) {
        const validator = readValidator();
        const address = lucid.utils.validatorToAddress(validator);
        const scriptUtxos = await lucid.utxosAt(address);

        console.log(scriptUtxos);
        const utxos: UTxO[] = scriptUtxos.filter((utxo: any, index: number) => {
            console.log(utxo.datum);
            const checkAsset: DualtargetDatum = Data.from(utxo.datum, DualtargetDatum);

            const existAsset = Data.from<DualtargetDatum>(utxo.datum, DualtargetDatum);
            console.log(existAsset);
        });
        // try {
        //     setWaitingDeposit(true);
        //     const contractAddress: string = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
        //     const vkeyOwnerHash: string = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash as string;
        //     const vkeyBeneficiaryHash: string = lucid.utils.getAddressDetails(contractAddress).paymentCredential?.hash as string;
        //     const sellingStrategies: ResultItem[] = calculateSellingStrategy({
        //         income: "",
        //         priceHight: "",
        //         priceLower: "",
        //         stake: 5,
        //         step: 1,
        //         totalADA: 24000,
        //     });
        //     const datums: DualtargetDatum[] = sellingStrategies.map(function (sellingStrategy: ResultItem, index: number) {
        //         return Data.to<DualtargetDatum>(
        //             {
        //                 odOwner: vkeyOwnerHash,
        //                 odBeneficiary: vkeyBeneficiaryHash,
        //                 assetA: BigInt("ADA"), //!
        //                 amountA: BigInt(sellingStrategy.amountSend),
        //                 assetOut: BigInt("MIN"), //!
        //                 minimumAmountOut: BigInt(sellingStrategy.minimumAmountOut),
        //                 minimumAmountOutProfit: BigInt(sellingStrategy.minimumAmountOutProfit),
        //                 buyPrice: BigInt(sellingStrategy.buyPrice),
        //                 sellPrice: BigInt(sellingStrategy.sellPrice),
        //                 odstrategy: "ADADJED",
        //                 BatcherFee: "BatcherFee",
        //                 OutputADA: "OutputADA",
        //                 fee_address: "fee_address_byte",
        //                 validator_address: "validator_address_byte",
        //                 deadline: BigInt(new Date().getTime() + 1 * 1000), // Convert wait_time to milliseconds and add to current time
        //                 isLimitOrder: BigInt(2),
        //             },
        //             DualtargetDatum,
        //         );
        //     });
        //     let tx: any = lucid.newTx();
        //     datums.forEach(async function (datum: DualtargetDatum) {
        //         tx = await tx.payToContract(contractAddress, { inline: datum }, { lovelace: 1000 });
        //     });
        //     tx = await tx.complete();
        //     const signedTx: TxSigned = await tx.sign().complete();
        //     const txHash: TxHash = await signedTx.submit();
        //     const success = await lucid.awaitTx(txHash);
        //     if (success) setTxHashDeposit(txHash);
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setWaitingDeposit(false);
        // }
    };

    const withdraw = async function ({ lucid }: { lucid: Lucid }) {
        try {
            // setWaitingWithdraw(false);
            // const refundRedeemer: Redeemer = Data.to<RefundRedeemer>({ CONSTR_ID: BigInt(1) }, RefundRedeemer);
            // const paymentAddress: string = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash as string;
            // const contractAddress: string = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
            // const scriptUtxos = await lucid.utxosAt(contractAddress);
            // let smartcontractUtxo: any = "";
            // const claimableUtxos: ClaimableUTxO[] = [];
            // for (const scriptUtxo of scriptUtxos) {
            //     if (scriptUtxo.scriptRef?.script) {
            //         smartcontractUtxo = scriptUtxo;
            //     } else if (scriptUtxo.datum) {
            //     }
            // }
            // const nftUtxo: any[] = [];
            // let nonNftUtxo: any = null;
            // const nonNftUtxoSpend: UTxO[] = [];
            // const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
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
            //     process.exit(1);
            // }
            // let tx: any = lucid.newTx();
            // for (const utxoToSpend of claimableUtxos) {
            //     console.log(utxoToSpend);
            //     tx = await tx.collectFrom(utxoToSpend.utxo, refundRedeemer);
            // }
            // tx = tx.complete();
            // const signedTx: TxSigned = await tx.sign().complete();
            // const txHash: TxHash = await signedTx.submit();
            // const success = await lucid.awaitTx(txHash);
            // if (success) setTxHashWithdraw(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingWithdraw(true);
        }
    };
    return <SmartContractContext.Provider value={{ deposit, withdraw }}>{children}</SmartContractContext.Provider>;
};

export default SmartContractProvider;
