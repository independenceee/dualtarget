import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const walletAddress: string = searchParams.get("wallet_address") as string;
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;

    const API = new BlockFrostAPI({
        projectId: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!,
        network: network!,
    });

    const result = await Promise.all(
        (
            await API.addressesTransactions(walletAddress)
        ).map(async function ({ tx_hash, block_time }) {
            return {
                block_time,
                tx_hash,
            };
        }),
    );

    const data = await Promise.all(result.map(async function () {

        
    }));
    return Response.json(result);
}
