import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { BlockfrostAdapter, NetworkId } from "@minswap/sdk";

const historyPrice = async function () {
    const MIN_ADA_POOL_ID = "6aa2153e1ae896a95539c9d62f76cedcdabdcdf144e564b8955f609d660cf6a2";

    const api = new BlockfrostAdapter({
        blockFrost: new BlockFrostAPI({
            network: "mainnet",
            projectId: process.env.BLOCKFROST_PROJECT_API_KEY_MAINNET!,
        }),
    });
    const history = await api.getPoolHistory({ id: MIN_ADA_POOL_ID });
    for (const historyPoint of history) {
        const pool = await api.getPoolInTx({ txHash: historyPoint.txHash });
        if (!pool) {
            throw new Error("pool not found");
        }
        const [price0, price1] = await api.getPoolPrice({
            pool,
            decimalsA: 6,
            decimalsB: 6,
        });
        console.log(`${historyPoint.time}: ${price0} ADA/MIN, ${price1} MIN/ADA`);
    }
};

export default historyPrice;
