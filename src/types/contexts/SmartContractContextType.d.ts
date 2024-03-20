export type SmartContractContextType = {
    deposit: ({ lucid }: { lucid: Lucid }) => Promise<void>;
    withdraw: ({ lucid }: { lucid: Lucid }) => Promise<void>;
};
