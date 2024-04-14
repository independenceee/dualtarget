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

    const addressToFind = "addr_test1wrkv2awy8l5nk9vwq2shdjg4ntlxs8xsj7gswj8au5xn8fcxyhpjk";

    const transactionsWithTargetAddress = results.filter((transaction) => {
        const hasInput = transaction.inputs.some((input) => input.address === addressToFind);
        const hasOutput = transaction.outputs.some((output) => output.address === addressToFind);
        return hasInput || hasOutput;
    });

    return Response.json(transactionsWithTargetAddress);
}
