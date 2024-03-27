import { Data } from "lucid-cardano";

const TokenSchema = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
});
export type Token = Data.Static<typeof TokenSchema>;
export const Token = TokenSchema as unknown as Token;

const DualtargetDatumSchema = Data.Object({
    odOwner: Data.Bytes(),
    odBeneficiary: Data.Bytes(),
    assetA: Data.Object({
        policyId: Data.Bytes(),
        assetName: Data.Bytes(),
    }),
    amountA: Data.Integer(),
    assetOut: Data.Object({
        policyId: Data.Bytes(),
        assetName: Data.Bytes(),
    }),
    minimumAmountOut: Data.Integer(),
    minimumAmountOutProfit: Data.Integer(),
    buyPrice: Data.Integer(),
    sellPrice: Data.Integer(),
    odstrategy: Data.Bytes(),
    BatcherFee: Data.Integer(),
    OutputADA: Data.Integer(),
    fee_address: Data.Bytes(),
    validator_address: Data.Bytes(),
    deadline: Data.Integer(),
    isLimitOrder: Data.Integer(),
});

export type DualtargetDatum = Data.Static<typeof DualtargetDatumSchema>;
export const DualtargetDatum = DualtargetDatumSchema as unknown as DualtargetDatum;
