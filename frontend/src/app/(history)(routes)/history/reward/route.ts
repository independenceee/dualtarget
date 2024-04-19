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

    for (let index = currentEpoch; index > currentEpoch - 10; index--) {}

    return Response.json({
        currentEpoch,
        totalReward,
        totalPendingReward,
    });
}
