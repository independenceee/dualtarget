```py
# Create the Dualtarget datum
        param = DaultargetParams(
            odOwner= bytes(vkey_owner_hash), #Address
            odBeneficiary= bytes(vkey_hash), # Address
            assetA= ADA, #ADA
            amountA= int(entry["amount_send"]), #
            assetOut= MIN,  #poolDatum.assetB
            minimumAmountOut= int(entry["minimumAmountOut"]),
            minimumAmountOutProfit= int(entry["minimumAmountOutProfit"]),
            buyPrice= int(entry["buyPrice"]),
            sellPrice= int(entry["sellPrice"]),
            odstrategy= b"ADADJED",
            BatcherFee= BatcherFee,
            OutputADA= OutputADA,
            fee_address= fee_address,
            validator_address= validator_address,
            deadline=int(time.time() + wait_time) * 1000,  # must be in milliseconds
            isLimitOrder= 2 #sell ADA
        )

```

```py
def calculate_selling_strategy(price_L, price_H, step, income, total_ADA, stake):
    result = []
    price = price_L
    sumADA=0
    while price <= price_H:

        qty_buy, qty_sell, qty_entry = qty_DualT(step,income,stake,price/decimal_places)
        buyPrice = int(price)
        sellPrice = int(buyPrice*(1+step/100))
        amountIn = int(qty_sell*decimal_places)
        minimumAmountOut = int(amountIn*buyPrice/decimal_places)
        minimumAmountOutProfit = int((step)/100*sellPrice*amountIn/decimal_places)
        amount_send = amountIn+BatcherFee+OutputADA
        sumADA += amount_send
        result.append({
            "buyPrice": int(buyPrice),
            "sellPrice": int(sellPrice),
            "amount_send": int(amount_send),
            "minimumAmountOut": int(minimumAmountOut),
            "minimumAmountOutProfit": int(minimumAmountOutProfit),
            "amount_sell": int(qty_sell*decimal_places),
            "amount_buy": int(qty_buy*decimal_places),
            "amount_entry": int(qty_entry*decimal_places),
            "usd_pool": int(price*qty_entry/decimal_places),
            "sumADA": int(sumADA),
            })
        price *= (1 + step / 100.0)


    return result
```

### Feedback

-   Xóa Preview network
-   Logo Thay đổi theo Dualtarget (cạnh network )

-   Header - Deposit - Withdraw

1.  Deposit (calculate_selling_strategy(price_l, price_h, step, income, totalada, stake))

    -   Bao nhiêu $ một tháng
    -   Bước nhảy theo giá (%)
    -   Giá thấp nhất
    -   Giá cao nhất
    -   ROI % stake theo năm
    -   Tổng ada
    -   Chart + Mesh Mua và bán

=> Output: UTXO,

-   Số thứ tự
-   Giá
-   số lượng ADA or DJED

=> Finish:

-   Fees (Sàn)
-   Tổng ADA
-   Tổng DJED
-   Onclick Deposit
-   Tạo n UTXO

2. Withdraw ()

-   Chọn tính năng rút

*   profit
*   ALL
*   Từng phần (Step Giá thấp nhất giá cao nhất)

-   Tính tổng
-   Tính phần lãi
-   Lợi nhuận theo năm / tháng
-   Chart + Mesh Mua và bán
