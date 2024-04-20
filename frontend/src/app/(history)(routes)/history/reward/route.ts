import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import convertDatetime from "~/helpers/convert-datetime";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const walletAddress: string = searchParams.get("wallet_address") as string;
    const page: string = searchParams.get("page") as string;
    const pageSize: string = searchParams.get("page_size") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const poolId: string = process.env.HADA_POOL_ID!;
    const stakeAddress: string = "stake1uyxnzh6wtdhtyxlyyjs4mmqrtfs52zzurdvczn9p23na0ccn824kf";

    const blockfrost = new Blockfrost(process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET!, network);
    const koios = new Koios(process.env.KOIOS_RPC_URL_MAINNET!);

    const totalReward: number = 0;
    const totalPendingReward: number = 0;

    const currentEpoch: number = (await blockfrost.epochsLatest()).epoch;

    const { data } = await koios.get(`/epoch_info?_epoch_no=${currentEpoch}&_include_next_epoch=true`);

    console.log(data);
    const startTime: number = data.start_time;
    const endTime: number = data.end_time;

    // total address
    const API = new BlockFrostAPI({
        projectId: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!,
        network: network!,
    });

    const results = await Promise.all(
        (
            await API.addressesTransactions(
                "addr_test1qzwu6jcqk8f96fxq02pvq2h4a927ggn35f2gzdklfte4kwx0sd5zdvsat2chsyyjxkjxcg6uz2y46avd46mzqdgdy3dsckqxs4",
            )
        )
            .reverse()
            .map(async function ({ tx_hash, block_time }) {
                    return {
                        block_time: block_time,
                        utxos: await API.txsUtxos(tx_hash),
                    };
                
            }),
    );

    const addressToFind = "addr_test1wrkv2awy8l5nk9vwq2shdjg4ntlxs8xsj7gswj8au5xn8fcxyhpjk";

    const transactionsWithTargetAddress = await Promise.all(
        results
            .map((transaction) => {
                const hasInput = transaction.utxos.inputs.some((input) => input.address === addressToFind);

                const hasOutput = transaction.utxos.outputs.some((output) => output.address === addressToFind);
                if (hasInput) {
                    let amount: number = -39000000;

                    transaction.utxos.inputs.forEach(function (input) {
                        if (input.address === addressToFind) {
                            const quantity = input.amount.reduce(function (total: number, { unit, quantity }) {
                                if (unit === "lovelace") {
                                    return total + Number(quantity);
                                }

                                return total;
                            }, 0);

                            amount += quantity;
                        }
                    }, 0);
                    return {
                        type: "Withdraw",
                        txHash: transaction.utxos.hash,
                        amount: +(amount / 1000000).toFixed(5),
                        blockTime: transaction.block_time,
                    };
                }

                if (hasOutput) {
                    let amount: number = 0;
                    transaction.utxos.outputs.forEach(function (output) {
                        if (output.address === addressToFind) {
                            const quantity = output.amount.reduce(function (total: number, { unit, quantity }) {
                                if (unit === "lovelace") {
                                    return total + Number(quantity);
                                }

                                return total;
                            }, 0);

                            amount += quantity;
                        }
                    }, 0);
                    return {
                        blockTime: transaction.block_time,
                        txHash: transaction.utxos.hash,
                        type: "Deposit",
                        amount: +(amount / 1000000).toFixed(5),
                    };
                }
            })
            .filter((output) => output != null),
    );

    let totalDeposit = 0;
    let totalWithdraw = 0;
    transactionsWithTargetAddress?.forEach((transaction: any) => {
        if (transaction?.blockTime >= startTime && transaction?.blockTime <= endTime) {
            if (transaction.type === "Deposit") {
                totalDeposit += transaction.amount;
            } else if (transaction.type === "Withdraw") {
                totalWithdraw += transaction.amount;
            }
        }
    });

    const totalDistribute = totalDeposit + totalWithdraw;

    return Response.json({
        currentEpoch,
        totalReward,
        totalPendingReward,
        totalDistribute,
    });
}
