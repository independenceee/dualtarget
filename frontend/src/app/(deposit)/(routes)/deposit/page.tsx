"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import { getKline, Kline } from "binance-historical";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders";
import styles from "./Deposit.module.scss";
import Image from "next/image";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import PriceChart from "~/components/PriceChart";
import { ChartDataType, dataChart, getChartData } from "~/constants/price-chart";
import Tippy from "~/components/Tippy";
import { Controller, useForm } from "react-hook-form";
import Button from "~/components/Button";
import ccxt, { binance } from "ccxt";
import Loading from "~/components/Loading";
import InputNumber from "~/components/InputNumber";

const cx = classNames.bind(styles);

type DepositeType = {
    income: string;
    priceHight: string;
    priceLow: string;
    stake: string;
    step: string;
    totalADA: string;
};

const Deposit = function () {
    const {
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<DepositeType>({
        defaultValues: {
            income: "",
            priceHight: "",
            priceLow: "",
            stake: "",
            step: "",
            totalADA: "",
        },
    });

    const [historyPrices, setHistoryPrices] = useState<ChartDataType | null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { deposit, waitingDeposit } = useContext<SmartContractContextType>(SmartContractContext);

    // useEffect(() => {
    //     const fetchADAData = async () => {
    //         setLoading(true);
    //         try {
    //             const binance: binance = new ccxt.binance({
    //                 apiKey: process.env.BINANCE_API_KEY as string,
    //                 secret: process.env.BINANCE_API_SECRET as string,
    //             });

    //             binance.setSandboxMode(true);
    //             const currentTime = new Date(Date.now());
    //             const oneYearAgo = currentTime.setFullYear(currentTime.getFullYear() - 1);
    //             const prices = await binance.fetchOHLCV("ADA/USDT", "1h", oneYearAgo, 10000);
    //             if (prices.length > 0) {
    //                 const _historyPrices = prices.map((price) => [price[0], price[4]]);
    //                 setHistoryPrices(_historyPrices as ChartDataType);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching ADA data:", error);
    //         }
    //     };

    //     fetchADAData().finally(() => {
    //         setLoading(false);
    //     });
    // }, []);

    useEffect(() => {
        const fetchADAData = async () => {
            setLoading(true);
            try {
            } catch (error) {
                console.error("Error fetching ADA data:", error);
            }
        };

        fetchADAData().finally(() => {
            setLoading(false);
        });
    }, []);

    const onDeposite = handleSubmit((data) => {
        lucid &&
            deposit({
                lucid,
                income: +data.income,
                priceHight: +data.priceHight,
                priceLow: +data.priceLow,
                stake: +data.stake,
                step: +data.step,
                totalADA: +data.totalADA,
            }).catch((error) => {});
    });
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
                                <Card title="Deposite DJED" icon={icons.djed} className={cx("stat-djed-stablecoin")}>
                                    <form onSubmit={onDeposite} className={"card-service"}>
                                        <div className={cx("balance")}>
                                            <span>Balance: {0} ₳</span>
                                        </div>
                                        <div className={cx("form-wrapper")}>
                                            <div className={cx("row-wrapper")}>
                                                <Controller
                                                    control={control}
                                                    name="priceLow"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "This field is required",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            title="Min price"
                                                            className={cx("input")}
                                                            placeholder="Enter the lowest price"
                                                            errorMessage={errors.priceLow?.message}
                                                        />
                                                    )}
                                                />
                                                <div className={cx("slash")}> - </div>
                                                <Controller
                                                    control={control}
                                                    name="priceHight"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "This field is required",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            title="Max price"
                                                            className={cx("input")}
                                                            placeholder="Enter the highest price"
                                                            errorMessage={errors.priceHight?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className={cx("row-wrapper")}>
                                                <Controller
                                                    control={control}
                                                    name="priceLow"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "This field is required",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            title="Min price"
                                                            className={cx("input")}
                                                            placeholder="Enter the lowest price"
                                                            errorMessage={errors.priceLow?.message}
                                                        />
                                                    )}
                                                />
                                                <div className={cx("slash")}> - </div>
                                                <Controller
                                                    control={control}
                                                    name="priceHight"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "This field is required",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            title="Max price"
                                                            className={cx("input")}
                                                            placeholder="Enter the highest price"
                                                            errorMessage={errors.priceHight?.message}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <div className={cx("row-wrapper")}>
                                                <Controller
                                                    control={control}
                                                    name="step"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "This field is required",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            title="Step"
                                                            className={cx("input")}
                                                            placeholder="Enter the price jump"
                                                            errorMessage={errors.step?.message}
                                                        />
                                                    )}
                                                />

                                                <div className={cx("slash")}> - </div>
                                                <Controller
                                                    control={control}
                                                    name="totalADA"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "This field is required",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            title="Total ADA"
                                                            className={cx("input")}
                                                            placeholder="Enter the total number of ada"
                                                            errorMessage={errors.totalADA?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className={cx("info")}>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>Cost</span>
                                                    <Tippy render={<div>Amount includes a 1.5% mint fee</div>}>
                                                        <Image
                                                            className={cx("icon-help-circle")}
                                                            src={icons.helpCircle}
                                                            width={12}
                                                            height={12}
                                                            alt=""
                                                        />
                                                    </Tippy>
                                                </div>
                                                {waitingDeposit ? <Loading /> : "-"}
                                            </div>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>Fees</span>
                                                    <Tippy
                                                        render={
                                                            <div>
                                                                <div className={cx("stats-fee")}>
                                                                    <span>Request Fee</span>
                                                                    <span>-</span>
                                                                </div>
                                                                <div className={cx("stats-fee")}>
                                                                    <span>Operator Fee</span>
                                                                    <span>-</span>
                                                                </div>
                                                            </div>
                                                        }
                                                    >
                                                        <Image
                                                            className={cx("icon-help-circle")}
                                                            src={icons.helpCircle}
                                                            width={12}
                                                            height={12}
                                                            alt=""
                                                        />
                                                    </Tippy>
                                                </div>
                                                -
                                            </div>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>You will pay</span>
                                                </div>
                                                {waitingDeposit ? <Loading /> : "-"}
                                            </div>
                                            <div className={cx("service-stats")}>
                                                <div className={cx("title-wrapper")}>
                                                    <span>Minimal ADA requirement</span>
                                                    <Tippy
                                                        placement="top"
                                                        render={
                                                            <div>
                                                                This amount will be reimbursed once the order is processed, irrespective of whether
                                                                the order is a success or not.
                                                                <a
                                                                    className={cx("tippy-content-link")}
                                                                    href="https://docs.cardano.org/native-tokens/minimum-ada-value-requirement/"
                                                                    target="_blank"
                                                                >
                                                                    Why is it required?
                                                                </a>
                                                            </div>
                                                        }
                                                    >
                                                        <Image
                                                            className={cx("icon-help-circle")}
                                                            src={icons.helpCircle}
                                                            width={12}
                                                            height={12}
                                                            alt=""
                                                        />
                                                    </Tippy>
                                                </div>
                                                -
                                            </div>
                                        </div>
                                        <Button className={cx("deposite-button")}>Deposite</Button>
                                    </form>
                                </Card>
                            </div>
                            <PriceChart data={historyPrices} isLoading={loading} />
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

export default Deposit;
