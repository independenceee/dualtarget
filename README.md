```json
{
    'buyPrice': 1000000,
    'sellPrice': 1100000,
    'amount_send': 116590909,
    'minimumAmountOut': 109090909,
    'minimumAmountOutProfit': 11999999,
    'amount_sell': 109090909,
    'amount_buy': 133333333,
    'amount_entry': 1200000000,
    'usd_pool': 1200,
    'sumADA': 116590909
}
{
    'buyPrice': 1100000,
    'sellPrice': 1210000,
    'amount_send': 106673553,
    'minimumAmountOut': 109090908,
    'minimumAmountOutProfit': 11999999,
    'amount_sell': 99173553,
    'amount_buy': 121212121,
    'amount_entry': 1090909090,
    'usd_pool': 1199,
    'sumADA': 223264462
}
{
    'buyPrice': 1210000,
    'sellPrice': 1331000,
    'amount_send': 97657776,
    'minimumAmountOut': 109090908,
    'minimumAmountOutProfit': 11999999,
    'amount_sell': 90157776,
    'amount_buy': 110192837,
    'amount_entry': 991735537,
    'usd_pool': 1200,
    'sumADA': 320922238
}


```

```py
@dataclass()
class ClaimRedeemer(PlutusData):
    CONSTR_ID= 0
    pass

@dataclass()
class RefundRedeemer(PlutusData):
    CONSTR_ID= 1
    pass

@dataclass()
class TradingRedeemer(PlutusData):
    CONSTR_ID= 2
    pass

@dataclass()
class BuyAdaRedeemer(PlutusData):
    CONSTR_ID= 3
    pass

@dataclass()
class SellAdaRedeemer(PlutusData):
    CONSTR_ID= 4
    pass

@dataclass()
class TrueRedeemer(PlutusData):
    CONSTR_ID= 5
    pass
```

```py
@click.command()
@click.argument("name")
@click.argument("beneficiary")
@click.option(
    "--price_l",
    type=int,
    default=1000000,
    help="price current ADA/DJED.",
)

@click.option(
    "--price_h",
    type=int,
    default=1300000,
    help="price current ADA/DJED.",
)
@click.option(
    "--step",
    type=int,
    default=10,
    help="Step %(5-100).",
)
@click.option(
    "--income",
    type=int,
    default=5,
    help="Monthly income USD from stakes",
)

@click.option(
    "--totalada",
    type=int,
    default=24000,
    help="Total investment (ADA)",
)

@click.option(
    "--stake",
    type=int,
    default=5,
    help="stake % (ADA)",
)

@click.option(
    "--wait_time",
    type=int,
    default=0,
    help="Time until the vesting contract deadline from current time",
)

def main(name: str, beneficiary: str, price_l: int, price_h: int, step: int, income: int, totalada: int, stake: int, wait_time: int):
    wallet = Wallet()
    context=wallet.context
    payment_address = get_address(name)
    vkey_owner_hash: VerificationKeyHash = payment_address.payment_part
    beneficiary_address = get_address(beneficiary)
    vkey_hash: VerificationKeyHash = beneficiary_address.payment_part

    _, _, fee_address = get_signing_info(beneficiary)
    fee_address=fee_address.payment_part.to_primitive()
    _, _, script_address = get_contract("dualtarget")
    validator_address=script_address.payment_part.to_primitive() #đưa vào datum
    print(f"validator_address {validator_address}")

    #Tính số  ADA và số token
    selling_strategy = calculate_selling_strategy(price_l, price_h, step, income, totalada, stake)
    params=[]
    # In ra danh sách
    for entry in selling_strategy:
        print(entry)

        # Create the Dualtarget datum
        param = DaultargetParams(
            odOwner= bytes(vkey_owner_hash), #Address
            odBeneficiary= bytes(vkey_hash), # Address
            assetA= ADA, #ADA
            amountA= int(entry["amount_send"]),
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
            isLimitOrder= 2 #sell ADA
        )
        params.append(param)

    # Build the transaction
    builder = TransactionBuilder(context)
    builder.add_input_address(payment_address)
    for param in params:
        # Make datum
        datum = param
        builder.add_output(
            TransactionOutput(address=script_address, amount=datum.amountA, datum=datum)
        )

    # Sign the transaction
    payment_vkey, payment_skey, payment_address = get_signing_info(name)
    signed_tx = builder.build_and_sign(
        signing_keys=[payment_skey],
        change_address=payment_address,
    )

    # Submit the transaction
    context.submit_tx(signed_tx.to_cbor())

    print(f"transaction id: {signed_tx.id}")
    if network == Network.TESTNET:
        print(f"Cexplorer: https://preprod.cexplorer.io/tx/{signed_tx.id}")
    else:
        print(f"Cexplorer: https://cexplorer.io/tx/{signed_tx.id}")

```

```py
def main(name: str):
    # Load chain context
    #context = OgmiosChainContext(ogmios_url, network=network, kupo_url=kupo_url)
    # context = get_chain_context()
    wallet = Wallet()
    context=wallet.context
    script_cbor, script_hash, script_address = get_contract("dualtarget")

    # Get payment address
    payment_address = get_address(name)


    #Thay đổi ==================================================================
    # Find a script UTxO
    script_utxos = context.utxos(str(script_address))
    sc_utxo = ""
    claimable_utxos = []
    utxo_to_spend = None

    for item in script_utxos:
        if item.output.script:
            sc_utxo = item
        elif item.output.datum:
            outputdatum = cbor2.loads(item.output.datum.cbor)

            params = DaultargetParams(
                outputdatum.value[0],
                outputdatum.value[1],
                outputdatum.value[2],
                outputdatum.value[3],
                outputdatum.value[4],
                outputdatum.value[5],
                outputdatum.value[6],
                outputdatum.value[7],
                outputdatum.value[8],
                outputdatum.value[9],
                outputdatum.value[10],
                outputdatum.value[11],
                outputdatum.value[12],
                outputdatum.value[13],
                outputdatum.value[14],
                outputdatum.value[15],
            )

            if (
                params.odOwner == bytes(payment_address.payment_part)  
                and item.output.amount.coin == int(params.OutputADA/2) 
                and params.isLimitOrder == 0
            ):
                fee_address1 = Address(
                    VerificationKeyHash.from_primitive(params.fee_address),
                    network=network,
                )
                
                claimable_utxos.append(
                    {"utxo": item,
                    "BatcherFee_addr": str(fee_address1), "fee": params.BatcherFee,
                    "minimumAmountOut": params.minimumAmountOut,
                    "minimumAmountOutProfit": params.minimumAmountOutProfit,
                    }
                )
    if not sc_utxo:
        print("Reference UTxO not found!")
        exit(1)

    if not len(claimable_utxos):
        print("no utxo to claim!")
        exit(1)

   # Find a collateral UTxO
    nft_utxo = []
    non_nft_utxo = None
    non_nft_utxo_spend = []
    # Get all UTxOs currently sitting at this address
    utxos = context.utxos(payment_address)
    for utxo in utxos:
        # multi_asset should be empty for collateral utxo
        if not utxo.output.amount.multi_asset and utxo.output.amount.coin >= 4000000 and utxo.output.amount.coin < 6000000:
            non_nft_utxo = utxo
        # multi_asset should be empty for collateral utxo
        elif not utxo.output.amount.multi_asset:
            non_nft_utxo_spend.append(
                {"utxo":utxo,
                }
            )
        else:
            nft_utxo.append(
                {"utxo":utxo,
                }
            )

    assert isinstance(non_nft_utxo, UTxO), "No collateral UTxOs found!"
    # Make redeemer
    redeemer = Redeemer(RefundRedeemer())

    #==============================================
    # Build the transaction
    builder = TransactionBuilder(context)
    # reference_inputs smart contract
    builder.reference_inputs.add(sc_utxo)

    #builder.add_input_address(payment_address)
    for utxo_to_spend in claimable_utxos:

        builder.add_script_input(utxo_to_spend["utxo"], redeemer=Redeemer(RefundRedeemer())) # thay đổ khi dùng ref_scripts để refund 1 lần được tất cả
        print(utxo_to_spend["utxo"])

    # output for BatcherFee
    builder.add_output(
        TransactionOutput(
            utxo_to_spend["BatcherFee_addr"],
            utxo_to_spend["fee"],

        )
    )
     #=
```

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

-   Logo Thay đổi theo Dualtarget (cạnh network ) => DONE

1.  Deposit (calculate_selling_strategy(price_l, price_h, step, income, totalada, stake))

    -   Bao nhiêu $ một tháng
    -   Bước nhảy theo giá (%)
    -   Giá thấp nhất
    -   Giá cao nhất
    -   ROI % stake theo năm
    -   Tổng ada
    -   Chart + Mesh Mua và bán => DONE

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

```ts
import { Wallet, TransactionBuilder, TransactionOutput, VerificationKeyHash } from "your-blockchain-library"; // Import necessary modules from your blockchain library

interface DaultargetParams {
    odOwner: Uint8Array;
    odBeneficiary: Uint8Array;
    assetA: string;
    amountA: number;
    assetOut: string;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    buyPrice: number;
    sellPrice: number;
    odstrategy: string;
    BatcherFee: number;
    OutputADA: number;
    fee_address: Uint8Array;
    validator_address: Uint8Array;
    deadline: number;
    isLimitOrder: number;
}

function main(
    name: string,
    beneficiary: string,
    price_l: number,
    price_h: number,
    step: number,
    income: number,
    totalada: number,
    stake: number,
    wait_time: number,
) {
    const wallet = new Wallet();
    const context = wallet.context;

    const payment_address = getAddress(name);
    const vkey_owner_hash: VerificationKeyHash = payment_address.payment_part;

    const beneficiary_address = getAddress(beneficiary);
    const vkey_hash: VerificationKeyHash = beneficiary_address.payment_part;

    const [_, _, fee_address] = getSigningInfo(beneficiary);
    const fee_address_byte = fee_address.payment_part.toUint8Array(); // Convert to byte array

    const [_, _, script_address] = getContract("dualtarget");
    const validator_address_byte = script_address.payment_part.toUint8Array(); // Convert to byte array

    const selling_strategy = calculateSellingStrategy(price_l, price_h, step, income, totalada, stake);
    const params: DaultargetParams[] = [];

    for (const entry of selling_strategy) {
        const param: DaultargetParams = {
            odOwner: vkey_owner_hash,
            odBeneficiary: vkey_hash,
            assetA: "ADA",
            amountA: entry.amount_send,
            assetOut: "MIN",
            minimumAmountOut: entry.minimumAmountOut,
            minimumAmountOutProfit: entry.minimumAmountOutProfit,
            buyPrice: entry.buyPrice,
            sellPrice: entry.sellPrice,
            odstrategy: "ADADJED",
            BatcherFee: BatcherFee,
            OutputADA: OutputADA,
            fee_address: fee_address_byte,
            validator_address: validator_address_byte,
            deadline: new Date().getTime() + wait_time * 1000, // Convert wait_time to milliseconds and add to current time
            isLimitOrder: 2,
        };
        params.push(param);
    }

    const builder = new TransactionBuilder(context);
    builder.addInputAddress(payment_address);
    for (const param of params) {
        const datum = param;
        builder.addOutput(new TransactionOutput(script_address, datum.amountA, datum));
    }

    const [payment_vkey, payment_skey, payment_address] = getSigningInfo(name);
    const signed_tx = builder.buildAndSign([payment_skey], payment_address);

    context.submitTx(signed_tx.toCbor());

    console.log(`transaction id: ${signed_tx.id}`);
    if (network === Network.TESTNET) {
        console.log(`Cexplorer: https://preprod.cexplorer.io/tx/${signed_tx.id}`);
    } else {
        console.log(`Cexplorer: https://cexplorer.io/tx/${signed_tx.id}`);
    }
}
```

```ts
import { Wallet, TransactionBuilder, Redeemer, TransactionOutput, VerificationKeyHash, Address, UTxO } from "your-blockchain-library"; // Import necessary modules from your blockchain library

interface DaultargetParams {
    odOwner: Uint8Array;
    odBeneficiary: Uint8Array;
    assetA: string;
    amountA: number;
    assetOut: string;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
    buyPrice: number;
    sellPrice: number;
    odstrategy: string;
    BatcherFee: number;
    OutputADA: number;
    fee_address: Uint8Array;
    validator_address: Uint8Array;
    deadline: number;
    isLimitOrder: number;
}

interface ClaimableUTxO {
    utxo: any;
    BatcherFee_addr: string;
    fee: number;
    minimumAmountOut: number;
    minimumAmountOutProfit: number;
}

interface NonNFTUTxO {
    utxo: UTxO;
}

function main(name: string) {
    const wallet = new Wallet();
    const context = wallet.context;

    const [script_cbor, script_hash, script_address] = getContract("dualtarget");

    const payment_address = getAddress(name);

    const script_utxos = context.utxos(script_address);
    let sc_utxo: any = "";
    const claimable_utxos: ClaimableUTxO[] = [];

    for (const item of script_utxos) {
        if (item.output.script) {
            sc_utxo = item;
        } else if (item.output.datum) {
            const outputdatum: any = cbor2.loads(item.output.datum.cbor);
            const params: DaultargetParams = {
                odOwner: outputdatum.value[0],
                odBeneficiary: outputdatum.value[1],
                assetA: outputdatum.value[2],
                amountA: outputdatum.value[3],
                assetOut: outputdatum.value[4],
                minimumAmountOut: outputdatum.value[5],
                minimumAmountOutProfit: outputdatum.value[6],
                buyPrice: outputdatum.value[7],
                sellPrice: outputdatum.value[8],
                odstrategy: outputdatum.value[9],
                BatcherFee: outputdatum.value[10],
                OutputADA: outputdatum.value[11],
                fee_address: outputdatum.value[12],
                validator_address: outputdatum.value[13],
                deadline: outputdatum.value[14],
                isLimitOrder: outputdatum.value[15],
            };
            if (
                params.odOwner === Uint8Array.from(payment_address.payment_part) &&
                item.output.amount.coin === Math.floor(params.OutputADA / 2) &&
                params.isLimitOrder === 0
            ) {
                const fee_address1 = new Address(VerificationKeyHash.fromPrimitive(params.fee_address), network);
                claimable_utxos.push({
                    utxo: item,
                    BatcherFee_addr: fee_address1.toString(),
                    fee: params.BatcherFee,
                    minimumAmountOut: params.minimumAmountOut,
                    minimumAmountOutProfit: params.minimumAmountOutProfit,
                });
            }
        }
    }

    if (!sc_utxo) {
        console.log("Reference UTxO not found!");
        process.exit(1);
    }

    if (!claimable_utxos.length) {
        console.log("No UTxO to claim!");
        process.exit(1);
    }

    const nft_utxo: any[] = [];
    let non_nft_utxo: NonNFTUTxO | null = null;
    const non_nft_utxo_spend: UTxO[] = [];

    const utxos = context.utxos(payment_address);
    for (const utxo of utxos) {
        if (!utxo.output.amount.multi_asset && utxo.output.amount.coin >= 4000000 && utxo.output.amount.coin < 6000000) {
            non_nft_utxo = { utxo: utxo };
        } else if (!utxo.output.amount.multi_asset) {
            non_nft_utxo_spend.push({ utxo: utxo });
        } else {
            nft_utxo.push({ utxo: utxo });
        }
    }

    if (!non_nft_utxo) {
        console.log("No collateral UTxOs found!");
        process.exit(1);
    }

    const redeemer = new Redeemer(new RefundRedeemer());

    const builder = new TransactionBuilder(context);
    builder.referenceInputs.add(sc_utxo);

    for (const utxo_to_spend of claimable_utxos) {
        builder.addScriptInput(utxo_to_spend.utxo, (redeemer = new Redeemer(new RefundRedeemer())));
        console.log(utxo_to_spend.utxo);
    }

    builder.addOutput(new TransactionOutput(utxo_to_spend.BatcherFee_addr, utxo_to_spend.fee));
}
```
