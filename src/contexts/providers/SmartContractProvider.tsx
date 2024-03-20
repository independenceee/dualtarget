"use client";

import { Data, Lucid, Script, TxHash, TxSigned } from "lucid-cardano";
import React, { ReactNode, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import convertAddressToPublicKey from "~/helpers/convert-address-to-public-key";
import { DaultargetParams, ResultItem } from "~/types/GenericsType";
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

    const deposit = async function ({ lucid, name }: { name: string; beneficiary: string; lucid: Lucid }) {
        try {
            setWaitingDeposit(true);

            // const validator: Script = readValidator();
            // const contractAddress: string = lucid.utils.validatorToAddress(validator);
            const contractAddress = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
            const sellingStrategies: ResultItem[] = calculateSellingStrategy({ price_L: })

            const datums: DualtargetDatum[] = sellingStrategies.map(function (sellingStrategy: ResultItem, index: number) {
                return Data.to<DualtargetDatum>(
                    {
                        odOwner: "vkey_owner_hash",
                        odBeneficiary: "vkey_hash",
                        assetA: BigInt("ADA"),
                        amountA: BigInt("entry.amount_send"),
                        assetOut: BigInt("MIN"),
                        minimumAmountOut: BigInt("entry.minimumAmountOut"),
                        minimumAmountOutProfit: BigInt("entry.minimumAmountOutProfit"),
                        buyPrice: BigInt("entry.buyPrice"),
                        sellPrice: BigInt("entry.sellPrice"),
                        odstrategy: "ADADJED",
                        BatcherFee: "BatcherFee",
                        OutputADA: "OutputADA",
                        fee_address: "fee_address_byte",
                        validator_address: "validator_address_byte",
                        deadline: BigInt(new Date().getTime() + 1 * 1000), // Convert wait_time to milliseconds and add to current time
                        isLimitOrder: BigInt(2),
                    },
                    DualtargetDatum,
                );
            });

            let tx: any = lucid.newTx();

            datums.forEach(async function (datum: DualtargetDatum) {
                tx = await tx.payToContract(contractAddress, { inline: datum }, { lovelace: 1000 });
            });

            tx = await tx.complete();

            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success = await lucid.awaitTx(txHash);
            if (success) setTxHashDeposit(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingDeposit(false);
        }
    };

    const withdraw = async function ({ lucid, name }: { lucid: Lucid; name: string }) {
        try {
            setWaitingWithdraw(false);
            const contractAddress = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;

            const scriptUtxos = await lucid.utxosAt(contractAddress);

            const refundRedeemer = Data.to<RefundRedeemer>({
                CONSTR_ID: BigInt(1)
            }, RefundRedeemer)



            let smartcontractUtxo: any = "";
            for (const scriptUtxo of scriptUtxos) {
                if (scriptUtxo.scriptRef?.script) {
                    smartcontractUtxo = scriptUtxo;
                } else if(scriptUtxo.datum) {

                }
            }

            let tx: any = lucid.newTx();

            tx= await tx.collectFrom(scriptUtxos, refundRedeemer)
                .addSigner(await lucid.wallet.address())
                .attachSpendingValidator(validator)
            tx = tx.complete();

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
    return <SmartContractContext.Provider value={{}}>{children}</SmartContractContext.Provider>;
};

export default SmartContractProvider;
