"use client";

import ccxt, { binance } from "ccxt";
import React, { ReactNode, useEffect, useState } from "react";
import CoinmarketContext from "~/contexts/components/CoinmarketContext";

type Props = {
    children: ReactNode;
};

const CoinmarketProvider = function ({ children }: Props) {
    const [history, setHistory] = useState(null);
    const [symbol, setSymbol] = useState<string>("USDT/ADA");

    useEffect(() => {
        const fetchADAData = async () => {
            try {
                const binance: binance = new ccxt.binance({
                    apiKey: process.env.BINANCE_API_KEY! as string,
                    secret: process.env.BINANCE_API_SECRET! as string,
                });
                binance.setSandboxMode(true);
                const prices = await binance.fetchOHLCV("ADA/USDT", "1h", undefined, 100);

                console.log(prices);
            } catch (error) {
                console.error("Error fetching ADA data:", error);
            }
        };

        fetchADAData();
    }, []);
    return <CoinmarketContext.Provider value={{}}>{children}</CoinmarketContext.Provider>;
};

export default CoinmarketProvider;
