import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import axios from "axios";
import convertDatetime from "~/helpers/convert-datetime";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";

const data = [
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
    },
    {
        epoch: 123,
        amount: 2000222,
        rewards: 20002,
        txHash: "123112313123123",
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
    const stakeAddress: string = "stake1uyxnzh6wtdhtyxlyyjs4mmqrtfs52zzurdvczn9p23na0ccn824kf";

    const blockfrost = new Blockfrost(process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET!, network);
    const koios = new Koios(process.env.KOIOS_RPC_URL_MAINNET!);

    const totalReward: number = 0;
    const totalPendingReward: number = 0;

    const currentEpoch: number = (await blockfrost.epochsLatest()).epoch;

    return Response.json(data);
}
