import { CalculateSellingStrategy } from "../GenericsType";

export type SmartContractContextType = {
    waitingDeposit: boolean;
    txHashDeposit: string;
    txHashWithdraw: string;
    waitingWithdraw: boolean;
    calcualateClaimEutxo: (params: { lucid: Lucid; mode: number }) => Promise<ClaimableUTxO[]>;
    deposit: (params: { lucid: Lucid; sellingStrategies: CalculateSellingStrategy[] }) => Promise<void>;
    withdraw: (params: { lucid: Lucid; mode: number; output: number }) => Promise<void>;
};
