import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import axios from "axios";
import convertDatetime from "~/helpers/convert-datetime";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";

const DATA = [
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
        status: "Distributed",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
        status: "Distributed",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
        status: "Distributed",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
        status: "Distributed",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
        status: "Distributed",
    },
];

/*
 * https://api.koios.rest/api/v0/pool_delegators_history?_pool_bech32=pool1xvaagsvl9prlr20hvg2qv434yss5c88r2ml6n43wcpepxmw85lj&_epoch_no=478
 * https://api.koios.rest/api/v0/pool_delegators_history?_pool_bech32=pool1xvaagsvl9prlr20hvg2qv434yss5c88r2ml6n43wcpepxmw85lj
 * https://preprod.koios.rest/#get-/epoch_info
 */

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const walletAddress: string = searchParams.get("wallet_address") as string;

    const page: string = searchParams.get("page") as string;
    const pageSize: string = searchParams.get("page_size") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const poolId: string = process.env.HADA_POOL_ID!;
    const koios = new Koios(process.env.KOIOS_RPC_URL_MAINNET!);
    const stakeAddress: string = "stake1uyxnzh6wtdhtyxlyyjs4mmqrtfs52zzurdvczn9p23na0ccn824kf";
    const { data } = await koios.get(`/epoch_info?_epoch_no=${480}&_include_next_epoch=true`);

    const parse = JSON.parse(data);
    const startTime: number = parse[0].start_time;
    const endTime: number = parse[0].end_time;

    const API = new BlockFrostAPI({
        projectId: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!,
        network: "preprod",
    });

    const results = await Promise.all(
        (await API.addressesTransactions(walletAddress)).reverse().map(async function ({ tx_hash, block_time }) {
            return {
                block_time: block_time,
                utxos: await API.txsUtxos(tx_hash),
            };
        }),
    );

    const range = results.filter(function ({ block_time, utxos }) {
        return block_time >= endTime;
    });

    const addressToFind = "addr_test1wrkv2awy8l5nk9vwq2shdjg4ntlxs8xsj7gswj8au5xn8fcxyhpjk";

    const transactionsWithTargetAddress = await Promise.all(
        range
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
                        status: "Completed",
                        fee: 1.5,
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
                        status: "Completed",
                        fee: 1.5,
                    };
                }
            })
            .filter((output) => output != null),
    );

    let depositTotal = 0;
    let withdrawTotal = 0;

    transactionsWithTargetAddress?.forEach((transaction: any) => {
        if (transaction.type === "Deposit") {
            depositTotal += transaction.amount;
        } else if (transaction.type === "Withdraw") {
            withdrawTotal += transaction.amount;
        }
    });

    return Response.json(DATA);
}
