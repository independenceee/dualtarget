import { Network } from "lucid-cardano";

<<<<<<< HEAD
export type ToastType = {
    icon: string | any;
    message?: string;
};

=======
>>>>>>> d85588f75a072d22e6ee6efcfd8d8f25924b8ef4
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

export type TransactionType = {
    id?: string;
    tx_hash: string;
    created_at?: string;
    updated_at?: string;

    date: string;
    action: string;
    amount: string;
    status: string;
    account_id: string;
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

export type CalculateSellingStrategy = {
    buyPrice: number;
    sellPrice: number;
    amountSend: number;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    amountSell: number;
    amountBuy: number;
    amountEntry: number;
    USDTPool: number;
    sumADA: number;
};
export interface ClaimableUTxO {
    utxo: any;
    BatcherFee_addr: string;
    fee: number;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
}

export type ChartHistoryRecord = {
    close: string;
    closeTime: number;
    high: string;
    ignored: string;
    low: string;
    open: string;
    openTime: number;
    quoteAssetVolume: string;
    takerBaseAssetVolume: string;
    takerQuoteAssetVolume: string;
    trades: number;
    volume: string;
};

export type ChartDataType = [number, number][];
