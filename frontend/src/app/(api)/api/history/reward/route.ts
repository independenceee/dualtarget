import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import { BATCHER_FEE, DECIMAL_PLACES } from "~/constants";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";
import caculateDepositWithdraw from "~/utils/calculate-deposit-withdraw";
import readEnviroment from "~/utils/read-enviroment";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page: string = searchParams.get("page") as string;
    const pageSize: string = searchParams.get("page_size") as string;
    const walletAddress: string = searchParams.get("wallet_address") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const adaPool: string = searchParams.get("ada_pool") as string;

    const enviroment = readEnviroment({ network: network, index: 0 });

    const poolId: string = enviroment.HADA_POOL_ID;
    const stakeAddress: string = enviroment.DUALTARGET_STAKE_ADDRESS;
    const smartcontractAddress: string = enviroment.DUALTARGET_CONTRACT_ADDRESS;
    const koios = new Koios(enviroment.KOIOS_RPC_URL);
    const blockfrost = new Blockfrost(
        enviroment.BLOCKFROST_PROJECT_API_KEY as string,
        network as CardanoNetwork,
    );

    const accountsDelegation = await blockfrost.accountsDelegations(stakeAddress);

    const specificTransaction = await blockfrost.txs(
        accountsDelegation[accountsDelegation.length - 1].tx_hash,
    );

    const currentEpoch = await blockfrost.epochsLatest();

    let results: any = [];
    const addrTsx = (
        await Promise.all(
            Array.from({ length: 5 }, async function (_, index: number) {
                return await blockfrost.addressesTransactions(smartcontractAddress, {
                    order: "desc",
                    count: 100,
                    page: index + 1,
                });
            }),
        )
    ).flat();

    for (let index = currentEpoch.epoch; index >= currentEpoch.epoch - 5; index--) {
        const amountStake: number = await koios.poolDelegatorsHistory({
            poolId: poolId,
            stakeAddress: stakeAddress,
            epochNo: index,
        });
        const accountRewards: number = await koios.accountRewards({
            stakeAddress,
            epochNo: index,
        });

        const { start_time, end_time } = await koios.epochInfomation({ epochNo: index });
        const addrTsxFilter = addrTsx.filter(function ({ block_time }, index: number) {
            return block_time >= start_time && block_time <= end_time;
        });

        const utxos = await Promise.all(
            addrTsxFilter.map(async function ({ tx_hash }) {
                return await blockfrost.txsUtxos(tx_hash);
            }),
        );

        const transactions: any[] = await Promise.all(
            utxos
                .map((transaction) => {
                    const hasInput: any = transaction.inputs.some(
                        (input: any) => input.address === walletAddress,
                    );
                    const hasOutput = transaction.outputs.some(
                        (output: any) => output.address === walletAddress,
                    );
                    if (hasInput) {
                        let amount: number = 0;
                        transaction.inputs.forEach(function (input: any) {
                            if (input.address === walletAddress) {
                                const quantity = input.amount.reduce(function (
                                    total: number,
                                    { unit, quantity }: any,
                                ) {
                                    if (unit === "lovelace" && !input.reference_script_hash) {
                                        return total + Number(quantity);
                                    }
                                    return total;
                                },
                                0);
                                amount += quantity;
                            }
                        });
                        return {
                            type: "input",
                            epoch: index,
                            amountStake: amountStake,
                            accountRewards: accountRewards,
                            adaPool: adaPool,
                            amount: +(amount / DECIMAL_PLACES).toFixed(5),
                        };
                    }

                    if (hasOutput) {
                        let amount = 0;
                        transaction.outputs.forEach(function (output) {
                            if (output.address === walletAddress) {
                                const quantity = output.amount.reduce(function (
                                    total: number,
                                    { unit, quantity }: any,
                                ) {
                                    if (unit === "lovelace" && !output.reference_script_hash) {
                                        return total + Number(quantity);
                                    }
                                    return total;
                                },
                                0);
                                amount += quantity;
                            }
                        });
                        return {
                            type: "output",
                            epoch: index,
                            amountStake: amountStake,
                            accountRewards: accountRewards,
                            adaPool: adaPool,
                            amount: +(amount / DECIMAL_PLACES).toFixed(5),
                        };
                    }
                })
                .filter((output) => output != null),
        );
        console.log(transactions);
    }

    const totalPage = Math.ceil(results.length / Number(pageSize));
    const histories = [...results].slice(
        (Number(page) - 1) * Number(pageSize),
        Number(page) * Number(pageSize),
    );

    // console.log(histories);

    return Response.json({
        totalPage,
        histories,
        totalItems: results.length,
    });
}
