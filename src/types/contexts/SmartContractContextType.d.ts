export type SmartContractContextType = {
    waitingDeposit: boolean;
    txHashDeposit: string;
    txHashWithdraw: string;
    waitingWithdraw: boolean;
    deposit: ({ lucid }: { lucid: Lucid }) => Promise<void>;
    withdraw: ({ lucid }: { lucid: Lucid }) => Promise<void>;
};
