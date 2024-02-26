import { Network } from "lucid-cardano";

export type WalletType = {
    name: string;
    image: string;
    balance?: number;
    address?: string;
    downloadApi?: string;
    api: () => Promise<any> | any;
    checkApi: () => Promise<any> | any;
};

export type Network = {
    networkName: Network;
    url: string;
    apiKey: string;
};
