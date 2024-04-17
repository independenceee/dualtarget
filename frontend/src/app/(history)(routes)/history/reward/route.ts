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

    const blockfrost = new Blockfrost(process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!, network);
    const koios = new Koios(process.env.KOIOS_RPC_URL_PREPROD!);

    const poolId = "pool1mvgpsafktxs883p66awp7fplj73cj6j9hqdxzvqw494f7f0v2dp";

    const totalReward: number = 0;
    const totalPendingReward: number = 0;

    const currentEpoch: number = (await blockfrost.epochsLatest()).epoch;

    
    return Response.json({
        currentEpoch,
        totalReward,
        totalPendingReward,
    });
}
