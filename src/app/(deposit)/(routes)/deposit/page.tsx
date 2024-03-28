"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders";
import styles from "./Deposit.module.scss";
import Service from "~/components/Card/Service";
import Image from "next/image";
import images from "~/assets/images";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import PriceChart from "~/components/PriceChart";
import { ChartDataType, dataChart, getChartData } from "~/constants/price-chart";
const cx = classNames.bind(styles);

const Djed = function () {
    const [data, setData] = useState<ChartDataType | null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { deposit, waitingDeposit } = useContext<SmartContractContextType>(SmartContractContext);

    useEffect(() => {
        setLoading(true);
        getChartData(dataChart)
            .then((data) => {
                setData(data as ChartDataType | null);
            })
            .finally(() => {
                setLoading(false);
            });
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
                                <Card
                                    title="Mint DJED"
                                    icon={icons.djed}
                                    className={cx("stat-djed-stablecoin")}
                                    buttonOptions={{
                                        onClick: () => deposit({ lucid: lucid }),
                                        children: "Deposit",
                                        disabled: !lucid || !!waitingDeposit,
                                    }}
                                >
                                    <Service type="PAY" />
                                </Card>
                                <Image className={cx("coin-image-left")} src={images.coinDjedLeft} alt="coin-djed" />
                                <Image className={cx("coin-image-right-mobile")} src={images.coinDjedRight} alt="coin-djed" />
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

export default Djed;
