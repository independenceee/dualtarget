import { Network } from "~/types/GenericsType";

const networks: Network[] = [
    {
        networkName: "Mainnet",
        url: process.env.BLOCKFROST_RPC_URL_MAINNET!,
        apiKey: process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET!,
    },
    {
        networkName: "Preview",
        url: process.env.BLOCKFROST_RPC_URL_PREVIEW!,
        apiKey: process.env.BLOCKFROST_PROJECT_API_KEY_PREVIEW!,
    },
    {
        networkName: "Preprod",
        url: process.env.BLOCKFROST_RPC_URL_PREPROD!,
        apiKey: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!,
    },
];

export { networks };
