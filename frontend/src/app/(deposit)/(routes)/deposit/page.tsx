"use client";

import classNames from "classnames/bind";
import React, { useContext, useMemo, useState } from "react";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders";
import styles from "./Deposit.module.scss";
import Image from "next/image";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { CalculateSellingStrategy, ChartDataType } from "~/types/GenericsType";
import Tippy from "~/components/Tippy";
import { Controller, useForm } from "react-hook-form";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import InputNumber from "~/components/InputNumber";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChartHistoryRecord } from "~/types/GenericsType";
import { CHART_TIME_PERIOD } from "~/components/PriceChart/PriceChart";
import CustomChart from "~/components/CustomChart";
import { AccountContextType } from "~/types/contexts/AccountContextType";
import AccountContext from "~/contexts/components/AccountContext";
import { get } from "~/utils/http-requests";
import calculateSellingStrategy from "~/utils/calculate-selling-strategy";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import CountUp from "react-countup";

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
    const { account } = useContext<AccountContextType>(AccountContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const [count, setCount] = useState<number>(6);
    const [page, setPage] = useState<number>(1);
    const [sellingStrategies, setSellingStrategies] = useState<CalculateSellingStrategy[]>([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ["transaction", page, count],
        queryFn: async function () {
            return await get("/transaction", {
                account_id: account?.id,
                page: page,
                count: count,
            });
        },
        enabled: !Boolean(account?.id),
    });

    const {
        handleSubmit,
        watch,
        control,
        getValues,
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

    const {
        data: chartDataRecords,
        isLoading: isGetChartRecordsLoading,
        isSuccess: isGetChartRecordsSuccess,
    } = useQuery({
        queryKey: ["ChartData"],
        queryFn: () => axios.get<ChartHistoryRecord[] | null>("http://localhost:3000/chart"),
        refetchInterval: 5 * 60 * 1000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const [currentChartPeriod, setCurrentChartPeriod] = useState<CHART_TIME_PERIOD>("ONE_DAY");
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { deposit, waitingDeposit } = useContext<SmartContractContextType>(SmartContractContext);

    const historyPrices: ChartDataType = useMemo(() => {
        if (isGetChartRecordsSuccess && chartDataRecords.data) {
            const prices = chartDataRecords.data.map((history) => [+history.closeTime, +history.high]);
            return prices as ChartDataType;
        }
        return [];
    }, [chartDataRecords, isGetChartRecordsSuccess]);

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

    const previewSellingStrategies = function () {
        const { income, priceHight, priceLow, stake, step, totalADA } = getValues();
        if (income && priceHight && priceLow && stake && step && totalADA) {
            const result = calculateSellingStrategy({
                income: +income,
                priceHight: +priceHight,
                priceLow: +priceLow,
                stake: +stake,
                step: +step,
                totalADA: +totalADA,
            });

            setSellingStrategies([
                {
                    buyPrice: 1210000,
                    sellPrice: 1331000,
                    amountSend: 97657776,
                    minimumAmountOut: 109090908,
                    minimumAmountOutProfit: 11999999,
                    amountSell: 90157776,
                    amountBuy: 110192837,
                    amountEntry: 991735537,
                    USDTPool: 1200,
                    sumADA: 320922238,
                },
                {
                    buyPrice: 1100000,
                    sellPrice: 1210000,
                    amountSend: 106673553,
                    minimumAmountOut: 109090908,
                    minimumAmountOutProfit: 11999999,
                    amountSell: 99173553,
                    amountBuy: 121212121,
                    amountEntry: 1090909090,
                    USDTPool: 1199,
                    sumADA: 223264462,
                },
            ]);
        } else {
            console.log("Please enter data");
        }
    };

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
                                    <button className={cx("preview-button")} onClick={previewSellingStrategies}>
                                        Preview
                                    </button>
                                    <form onSubmit={onDeposite} className={"card-service"}>
                                        <div className={cx("balance")}>
                                            <span>
                                                Balance: <CountUp end={wallet?.balance || 0} start={0} /> ₳
                                            </span>
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
                                                    name="income"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "This field is required",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            title="Desired income"
                                                            className={cx("input")}
                                                            placeholder="Enter the lowest price"
                                                            errorMessage={errors.income?.message}
                                                        />
                                                    )}
                                                />
                                                <div className={cx("slash")}> - </div>
                                                <Controller
                                                    control={control}
                                                    name="stake"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "This field is required",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            title="Stake (%)"
                                                            className={cx("input")}
                                                            placeholder="Enter the stake percentage"
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
                            <CustomChart isLoading={isGetChartRecordsLoading} data={historyPrices} preview={sellingStrategies} />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className={cx("header-order")}>
                    <h2 className={cx("title")}>Orders</h2>
                </div>
                <Orders data={data} isLoading={isLoading} className={cx("orders")} />
            </section>
        </div>
    );
};

export default Deposit;
