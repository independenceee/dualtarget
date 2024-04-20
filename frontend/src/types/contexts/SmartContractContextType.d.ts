import { CalculateSellingStrategy } from "../GenericsType";

export type SmartContractContextType = {
    waitingDeposit: boolean;
    txHashDeposit: string;
    txHashWithdraw: string;
    waitingWithdraw: boolean;
    calcualateClaimEutxo: ({ lucid, mode }: { lucid: Lucid; mode: number }) => Promise<ClaimableUTxO[]>;
    deposit: ({ lucid, sellingStrategies }: { lucid: Lucid; sellingStrategies: CalculateSellingStrategy[] }) => Promise<void>;
    withdraw: ({ lucid, mode }: { lucid: Lucid; mode: number }) => Promise<void>;
};
