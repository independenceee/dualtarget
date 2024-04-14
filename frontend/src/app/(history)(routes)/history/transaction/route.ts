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

    const results = await Promise.all(
        (
            await API.addressesTransactions(walletAddress)
        ).map(function ({ tx_hash, block_time }) {
            return API.txsUtxos(tx_hash);
        }),
    );

    let foundObjects: any[] = [];

    const addressToFind = "addr_test1wrkv2awy8l5nk9vwq2shdjg4ntlxs8xsj7gswj8au5xn8fcxyhpjk";

    results.forEach((transaction) => {
        transaction.inputs.forEach((input) => {
            if (input.address === addressToFind) {
                foundObjects.push({ ...input, type: "input" });
            }
        });

        transaction.outputs.forEach((output) => {
            if (output.address === addressToFind) {
                foundObjects.push({ ...output, type: "output" });
            }
        });
    });

    return Response.json(results);
}
