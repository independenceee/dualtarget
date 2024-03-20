interface ResultItem {
    buyPrice: number;
    sellPrice: number;
    amountSend: number;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    amountSell: number;
    amountBuy: number;
    amountEntry: number;
    usdPool: number;
    sumADA: number;
}

type Props = {
    priceLower: number;
    priceHight: number;
    step: number;
    income: number;
    totalADA: number;
    stake: number;
};

const qty_DualT = function (step: number, income: number, stake: number, entry: number): [number, number, number] {
    try {
        const USDTPool: number = (income * 12) / (stake / 100);
        const qtyEntrySell: number = USDTPool / (entry * (1 + step / 100));
        const qtyEntry: number = USDTPool / entry;
        const qtyEntryBuy: number = USDTPool / (entry * (1 - step / 100));
        const qtyDualTBuy: number = qtyEntryBuy - qtyEntry;
        const qtyDualTSell: number = qtyEntry - qtyEntrySell;

        return [qtyDualTBuy, qtyDualTSell, qtyEntry];
    } catch (error) {
        console.log("qtyDualTarget: " + error);
        return [0, 0, 0];
    }
};

function calculateSellingStrategy({ priceLower, priceHight, step, income, totalADA, stake }: Props): ResultItem[] {
    const result: ResultItem[] = [];
    let price: number = priceLower;
    let sumADA: number = 0;
    const decimalPlaces: number = 100;

    while (price <= priceHight) {
        const [qty_buy, qty_sell, qtyEntry] = qty_DualT(step, income, stake, price / decimalPlaces);
        const buyPrice: number = Math.floor(price);
        const sellPrice: number = Math.floor(buyPrice * (1 + step / 100));
        const amountIn: number = Math.floor(qty_sell * decimalPlaces);
        const minimumAmountOut: number = Math.floor((amountIn * buyPrice) / decimalPlaces);
        const minimumAmountOutProfit: number = Math.floor(((step / 100) * sellPrice * amountIn) / decimalPlaces);
        const amountSend: number = amountIn + BatcherFee + OutputADA;
        sumADA += amountSend;
        result.push({
            buyPrice: Math.floor(buyPrice),
            sellPrice: Math.floor(sellPrice),
            amountSend: Math.floor(amountSend),
            minimumAmountOut: Math.floor(minimumAmountOut),
            minimumAmountOutProfit: Math.floor(minimumAmountOutProfit),
            amountSell: Math.floor(qty_sell * decimalPlaces),
            amountBuy: Math.floor(qty_buy * decimalPlaces),
            amountEntry: Math.floor(qtyEntry * decimalPlaces),
            usdPool: Math.floor((price * qtyEntry) / decimalPlaces),
            sumADA: Math.floor(sumADA),
        });
        price *= 1 + step / 100;
    }

    return result;
}

export default calculateSellingStrategy;
