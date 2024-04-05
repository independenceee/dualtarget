import { Kline, getKline } from "binance-historical";

export async function GET() {
    const result: Array<Kline> = await getKline("ADAUSDT", "4h", new Date("01-09-2020"), new Date("01-12-2021"));
    return Response.json(result);
}
