import { CalculateSellingStrategy } from "../GenericsType";

export type SmartContractContextType = {
    waitingDeposit: boolean;
    txHashDeposit: string;
    txHashWithdraw: string;
    waitingWithdraw: boolean;
    previewWithdraw: ({ lucid, min, max }: { lucid: Lucid; min?: number; max?: number }) => Promise<CalculateSellingStrategy[]>;
    calcualateClaimEutxo: ({ lucid, mode }: { lucid: Lucid; mode: number }) => Promise<ClaimableUTxO[]>;
    deposit: ({ lucid, sellingStrategies }: { lucid: Lucid; sellingStrategies: CalculateSellingStrategy[] }) => Promise<void>;
    withdraw: ({ lucid, mode, output }: { lucid: Lucid; mode: number; min?: number; max?: number }) => Promise<void>;
};
