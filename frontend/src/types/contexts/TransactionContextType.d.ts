import { TransactionType } from "~/types/GenericsType";

export type TransactionContextType = {
    transactions: Array<TransactionType>;
    setTransactions: React.Dispatch<React.SetStateAction<Array<TransactionType>>>;
};
