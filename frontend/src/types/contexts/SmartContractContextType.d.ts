import { CalculateSellingStrategy, ClaimableUTxO } from "~/types/GenericsType";

export type SmartContractContextType = {
    waitingDeposit: boolean;
    txHashDeposit: string;
    txHashWithdraw: string;
    waitingWithdraw: boolean;
    previewWithdraw: ({ lucid }: { lucid: Lucid }) => Promise<CalculateSellingStrategy[]>;
    calcualateClaimEutxo: ({ lucid, mode }: { lucid: Lucid; mode: number; min?: number; max?: number }) => Promise<ClaimableUTxO[]>;
    deposit: ({ lucid, sellingStrategies }: { lucid: Lucid; sellingStrategies: CalculateSellingStrategy[] }) => Promise<void>;
    withdraw: ({ lucid, claimableUtxos }: { lucid: Lucid; claimableUtxos: Array<ClaimableUTxO> }) => Promise<void>;
};
