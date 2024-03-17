interface ResultItem {
    buyPrice: number;
    sellPrice: number;
    amount_send: number;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    amount_sell: number;
    amount_buy: number;
    amount_entry: number;
    usd_pool: number;
    sumADA: number;
}

type Props = {
    price_L: number;
    price_H: number;
    step: number;
    income: number;
    total_ADA: number;
    stake: number;
};

function calculateSellingStrategy({ price_L, price_H, step, income, total_ADA, stake }: Props): ResultItem[] {
    const result: ResultItem[] = [];
    let price: number = price_L;
    let sumADA: number = 0;
    const decimal_places: number = 100;

    while (price <= price_H) {
        const { qty_buy, qty_sell, qty_entry } = qty_DualT(step, income, stake, price / decimal_places);
        const buyPrice: number = Math.floor(price);
        const sellPrice: number = Math.floor(buyPrice * (1 + step / 100));
        const amountIn: number = Math.floor(qty_sell * decimal_places);
        const minimumAmountOut: number = Math.floor((amountIn * buyPrice) / decimal_places);
        const minimumAmountOutProfit: number = Math.floor(((step / 100) * sellPrice * amountIn) / decimal_places);
        const amount_send: number = amountIn + BatcherFee + OutputADA;
        sumADA += amount_send;
        result.push({
            buyPrice: Math.floor(buyPrice),
            sellPrice: Math.floor(sellPrice),
            amount_send: Math.floor(amount_send),
            minimumAmountOut: Math.floor(minimumAmountOut),
            minimumAmountOutProfit: Math.floor(minimumAmountOutProfit),
            amount_sell: Math.floor(qty_sell * decimal_places),
            amount_buy: Math.floor(qty_buy * decimal_places),
            amount_entry: Math.floor(qty_entry * decimal_places),
            usd_pool: Math.floor((price * qty_entry) / decimal_places),
            sumADA: Math.floor(sumADA),
        });
        price *= 1 + step / 100;
    }

    return result;
}
