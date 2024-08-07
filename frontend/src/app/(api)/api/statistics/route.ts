import { CardanoNetwork } from "@blockfrost/blockfrost-js/lib/types";
import { NextRequest } from "next/server";
import { DECIMAL_PLACES } from "~/constants";
import Blockfrost from "~/services/blockfrost";
import { EnviromentType } from "~/types/GenericsType";
import readEnviroment from "~/utils/read-enviroment";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const network: CardanoNetwork = searchParams.get("network") as CardanoNetwork;
    const enviroment: EnviromentType = readEnviroment({
        network: network,
    });

    const blockfrost = new Blockfrost(
        enviroment.BLOCKFROST_PROJECT_API_KEY,
        network as CardanoNetwork,
    );

    const addressesTotal = await blockfrost.addressesTotal(enviroment.DUALTARGET_CONTRACT_ADDRESS);

    const totalVolumeDepositsADA = addressesTotal.received_sum.reduce(
        (accumulator, currentValue) => {
            if (currentValue.unit === "lovelace") {
                return accumulator + parseInt(currentValue.quantity) / DECIMAL_PLACES;
            }
            return accumulator;
        },
        0,
    );

    const totalVolumeWithdrawsADA = addressesTotal.sent_sum.reduce((accumulator, currentValue) => {
        if (currentValue.unit === "lovelace") {
            return accumulator + parseInt(currentValue.quantity) / DECIMAL_PLACES;
        }
        return accumulator;
    }, 0);

    const totalVolumeDepositsDJED = addressesTotal.sent_sum.reduce((accumulator, currentValue) => {
        if (currentValue.unit === enviroment.DJED_TOKEN_ASSET) {
            return accumulator + parseInt(currentValue.quantity) / DECIMAL_PLACES;
        }
        return accumulator;
    }, 0);

    const totalVolumeWithdrawsDJED = addressesTotal.received_sum.reduce(
        (accumulator, currentValue) => {
            if (currentValue.unit === enviroment.DJED_TOKEN_ASSET) {
                return accumulator + parseInt(currentValue.quantity) / DECIMAL_PLACES;
            }
            return accumulator;
        },
        0,
    );

    const totalTransaction: number = addressesTotal.tx_count;

    return Response.json({
        totalTransaction: totalTransaction,
        totalVolumeWithdrawsDJED: totalVolumeWithdrawsDJED,
        totalVolumeWithdrawsADA: totalVolumeWithdrawsADA,
        totalVolumeDepositsADA: totalVolumeDepositsADA,
        totalVolumeDepositsDJED: totalVolumeDepositsDJED,
    });
}
