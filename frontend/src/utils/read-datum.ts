import { Lucid, UTxO } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    contractAddress: string;
};

const readDatum = async function ({ contractAddress, lucid }: Props) {
    try {
        const scriptUtxos: Array<UTxO> = await lucid.utxosAt(contractAddress);
    } catch (error) {
        console.log(error);
    }
};

export default readDatum;
