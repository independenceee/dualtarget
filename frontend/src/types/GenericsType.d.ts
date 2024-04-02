import { Network } from "lucid-cardano";

export type AccountType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    walletAddress: string;
    stakeAddress: string;
};

export type WalletType = {
    name: string;
    image: string;
    balance?: number;
    address?: string;
    downloadApi?: string;
    api: () => Promise<any> | any;
    checkApi: () => Promise<any> | any;
};

export type NetworkType = {
    networkName: Network;
    url: string;
    apiKey: string;
};

export type HeaderTableType = {
    title: string;
    description?: string;
};

// test
export interface DaultargetParams {
    odOwner: Uint8Array;
    odBeneficiary: Uint8Array;
    assetA: string;
    amountA: number;
    assetOut: string;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    buyPrice: number;
    sellPrice: number;
    odstrategy: string;
    BatcherFee: number;
    OutputADA: number;
    fee_address: Uint8Array;
    validator_address: Uint8Array;
    deadline: number;
    isLimitOrder: number;
}

export interface SellingStrategyResult {
    buyPrice: number;
    sellPrice: number;
    amount_send: number;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    amount_sell: number;
    amount_buy: number;
    amount_entry: number;
    usd_pool: number;
    sumADA: number;
}

export interface ClaimableUTxO {
    utxo: any;
    BatcherFee_addr: string;
    fee: number;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
}
