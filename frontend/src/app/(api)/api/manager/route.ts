import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import Blockfrost from "~/services/blockfrost";
import Koios from "~/services/koios";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page: string = searchParams.get("page") as string;
    const epoch: string = searchParams.get("epoch") as string;
    const pageSize: string = searchParams.get("page_size") as string;
    const network: string = searchParams.get("network") as CardanoNetwork;

    const blockfrost = new Blockfrost(
        network === "preprod"
            ? process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!
            : process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET!,
        network as CardanoNetwork,
    );

    const koios = new Koios(
        network === "preprod"
            ? (process.env.KOIOS_RPC_URL_PREPROD! as string)
            : (process.env.KOIOS_RPC_URL_MAINNET! as string),
    );

    const stakeAddress: string =
        network === "preprod"
            ? (process.env.DUALTARGET_STAKE_ADDRESS_PREPROD as string)
            : (process.env.DUALTARGET_STAKE_ADDRESS_MAINNET as string);

    const poolId: string =
        network === "preprod"
            ? (process.env.POOL_ID_PREPROD as string)
            : (process.env.POOL_ID_MAINNET! as string);

    const smartcontractAddress: string =
        network === "preprod"
            ? (process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD as string)
            : (process.env.DUALTARGET_CONTRACT_ADDRESS_MAINNET as string);

    
    
    return Response.json({
        
    });
}
