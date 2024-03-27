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

function qtyDualT(Pstep: number, income: number, stake: number, entry: number): [number, number, number] {
    try {
        const USDTpool: number = (income * 12) / (stake / 100); // số lượng USD cần đảm bảo
        const qtyentrysell: number = USDTpool / (entry * (1 + Pstep / 100)); // số lượng ADA cần tại giá sell
        const qtyentry: number = USDTpool / entry; // số lượng ADA cần tại giá hiện tại
        const qtyentrybuy: number = USDTpool / (entry * (1 - Pstep / 100)); // số lượng ADA cần tại giá buy

        const qtyDualTbuy: number = qtyentrybuy - qtyentry; // số lượng ADA cần buy tại giá
        const qtyDualTsell: number = qtyentry - qtyentrysell; // số lượng ADA cần sell tại giá

        console.log([qtyDualTbuy, qtyDualTsell, qtyentry]);
        return [qtyDualTbuy, qtyDualTsell, qtyentry];
    } catch (error) {
        console.log("qtyDualTarget: " + error);
        return [0, 0, 0];
    }
}

interface SellingStrategyResult {
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

function calculateSellingStrategy({
    price_H,
    price_L,
    step,
    income,
    stake,
    total_ADA,
}: {
    price_L: number;
    price_H: number;
    step: number;
    income: number;
    total_ADA: number;
    stake: number;
}): SellingStrategyResult[] {
    const result: SellingStrategyResult[] = [];
    const decimal_places: number = 10;

    let price: number = price_L;
    let sumADA: number = 0;
    let BatcherFee = 1500000;
    let OutputADA = 3000000;

    while (price <= price_H) {
        const [qty_buy, qty_sell, qty_entry] = qtyDualT(step, income, stake, price / decimal_places);

        const buyPrice: number = Math.floor(price);
        const sellPrice: number = Math.floor(buyPrice * (1 + step / 100));
        const amountIn: number = Math.floor(qty_sell * decimal_places);
        const minimumAmountOut: number = Math.floor((amountIn * buyPrice) / decimal_places);
        const minimumAmountOutProfit: number = Math.floor(((step / 100) * sellPrice * amountIn) / decimal_places);
        console.log(minimumAmountOut, minimumAmountOutProfit);
        const amount_send: number = amountIn + BatcherFee + OutputADA;
        sumADA += amount_send;

        result.push({
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            amount_send: amount_send,
            minimumAmountOut: minimumAmountOut,
            minimumAmountOutProfit: minimumAmountOutProfit,
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

export default calculateSellingStrategy;
