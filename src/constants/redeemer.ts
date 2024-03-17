import { Data } from "lucid-cardano";

const ClaimRedeemerSchema = Data.Object({
    CONSTR_ID: Data.Integer(),
});

export type ClaimRedeemer = Data.Static<typeof ClaimRedeemerSchema>;
export const ClaimRedeemer = ClaimRedeemerSchema as unknown as ClaimRedeemer;

const RefundRedeemerSchema = Data.Object({
    CONSTR_ID: Data.Integer(),
});

export type RefundRedeemer = Data.Static<typeof RefundRedeemerSchema>;
export const RefundRedeemer = RefundRedeemerSchema as unknown as RefundRedeemer;

const TradingRedeemerSchema = Data.Object({
    CONSTR_ID: Data.Integer(),
});

export type TradingRedeemer = Data.Static<typeof TradingRedeemerSchema>;
export const TradingRedeemer = TradingRedeemerSchema as unknown as TradingRedeemer;

const BuyAdaRedeemerSchema = Data.Object({
    CONSTR_ID: Data.Integer(),
});

export type BuyAdaRedeemer = Data.Static<typeof BuyAdaRedeemerSchema>;
export const BuyAdaRedeemer = BuyAdaRedeemerSchema as unknown as BuyAdaRedeemer;

const SellAdaRedeemerSchema = Data.Object({
    CONSTR_ID: Data.Integer(),
});

export type SellAdaRedeemer = Data.Static<typeof SellAdaRedeemerSchema>;
export const SellAdaRedeemer = SellAdaRedeemerSchema as unknown as TradingRedeemer;

const TrueRedeemerSchema = Data.Object({
    CONSTR_ID: Data.Integer(),
});

export type TrueRedeemer = Data.Static<typeof TrueRedeemerSchema>;
export const TrueRedeemer = TrueRedeemerSchema as unknown as TrueRedeemer;
