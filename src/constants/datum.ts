import { Data } from "lucid-cardano";

const DualtargetDatumSchema = Data.Object({
    odOwner: Data.Bytes(), // Address
    odBeneficiary: Data.Bytes(), // Address
    assetA: Data.Integer(), // !ADA
    amountA: Data.Integer(),
    assetOut: Data.Integer(),
    minimumAmountOut: Data.Integer(),
    minimumAmountOutProfit: Data.Integer(),
    buyPrice: Data.Integer(),
    sellPrice: Data.Integer(),
    odstrategy: Data.Bytes(),
    BatcherFee: Data.Bytes(),
    OutputADA: Data.Bytes(),
    fee_address: Data.Bytes(),
    deadline: Data.Integer(),
    isLimitOrder: Data.Integer(),
    validator_address: Data.Bytes(),
});

export type DualtargetDatum = Data.Static<typeof DualtargetDatumSchema>;
export const DualtargetDatum = DualtargetDatumSchema as unknown as DualtargetDatum;
