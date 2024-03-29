export type SmartContractContextType = {
    waitingDeposit: boolean;
    txHashDeposit: string;
    txHashWithdraw: string;
    waitingWithdraw: boolean;
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
    withdraw: ({ lucid }: { lucid: Lucid }) => Promise<void>;
};
