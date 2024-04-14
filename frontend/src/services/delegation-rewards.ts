import { DelegationRewardType } from "~/types/GenericsType";

type Props = {
    stakeAddress: string;
};

const delegationRewards = async function ({ stakeAddress }: Props): Promise<Array<DelegationRewardType>> {
    try {
    } catch (error) {
        console.log(error);
    }
};

export default delegationRewards;
