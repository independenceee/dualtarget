export type SmartContractContextType = {
    waitingDeposit: boolean;
    txHashDeposit: string;
    txHashWithdraw: string;
    waitingWithdraw: boolean;
    calcualateClaimEutxo: ({ lucid, mode }: { lucid: Lucid; mode: number }) => Promise<ClaimableUTxO[]>;
    deposit: ({
        lucid,
        income,
        priceHight,
        priceLow,
        stake,
        step,
        totalADA,
    }: {
        lucid: Lucid;
        income: number;
        priceHight: number;
        priceLow: number;
        stake: number;
        step: number;
        totalADA: number;
    }) => Promise<void>;
    withdraw: ({ lucid, mode }: { lucid: Lucid; mode: number }) => Promise<void>;
};
