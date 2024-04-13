import { TransactionHistoryType } from "~/types/GenericsType";

type Props = {
    walletAddress: string;
};

const transactionHistory = async function ({ walletAddress }: Props): Promise<Array<TransactionHistoryType>> {
    try {
    } catch (error) {
        return [];
    }
};

export default transactionHistory;
