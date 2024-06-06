import axios from "axios";
import { Lucid, TxHash } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    url: string;
    txHash: TxHash;
};

const readTxHash = async function ({ lucid, url, txHash }: Props) {
    const { data } = await axios.post(`https://preprod.koios.rest/api/v1/tx_info`, { _tx_hashes: [txHash] });

    console.log(data);
};

export default readTxHash;
