"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders/Orders";
import styles from "./Withdraw.module.scss";
import Service from "~/components/Card/Service";
import Image from "next/image";
import images from "~/assets/images";
import dynamic from "next/dynamic";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import ccxt, { OHLCV, binance } from "ccxt";
import Button from "~/components/Button";

const PriceChart = dynamic(() => import("~/components/PriceChart"), {
    ssr: false,
});

const cx = classNames.bind(styles);

const Withdraw = function () {
    const [data, setData] = useState<[number, number][]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { waitingWithdraw, withdraw } = useContext<SmartContractContextType>(SmartContractContext);

    useEffect(() => {
        const fetchADAData = async () => {
            try {
                const binance: binance = new ccxt.binance({
                    apiKey: process.env.BINANCE_API_KEY! as string,
                    secret: process.env.BINANCE_API_SECRET! as string,
                });
                binance.setSandboxMode(true);
                const prices = (await binance.fetchOHLCV("ADA/USDT", "1y", undefined, 500)).map(function (result: OHLCV, index) {
                    const [timestamp, price, ...other] = result;

                    return [Number(timestamp), Number(price)];
                });
                setData(prices);
            } catch (error) {
                console.error("Error fetching ADA data:", error);
            }
        };

        fetchADAData();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <section className={cx("header-wrapper")}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>Mint or Burn DJED</h2>
                </div>
                <div className={cx("stats")}>
                    <div className={cx("stats-inner")}>
                        <div className={cx("stats")}>
                            <div className={cx("card-wrapper")}>
                                <Card title="Mint DJED" icon={icons.djed} className={cx("stat-djed-stablecoin")}>
                                    <Service type="PAY" />
                                    <Button onClick={() => withdraw({ lucid })} className={cx("withdraw-button")}>
                                        Withdraw
                                    </Button>
                                </Card>
                                <Image className={cx("coin-image-left")} src={images.coinDjedLeft} alt="coin-djed" />
                            </div>

                            <PriceChart data={data} isLoading={loading} />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={cx("header-order")}>
                    <h2 className={cx("title")}>Orders</h2>
                </div>
                <Orders className={cx("orders")} />
            </section>
        </div>
    );
};

export default Withdraw;
