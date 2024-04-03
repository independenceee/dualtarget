"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import Button from "~/components/Button";
import Input from "~/components/Input";

const cx = classNames.bind(styles);

type DepositeBodyType = {
    income: number;
    priceHight: number;
    priceLow: number;
    stake: number;
    step: number;
    totalADA: number;
};

const Djed = function () {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DepositeBodyType>();

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

    const onDeposite = handleSubmit((data) => {
        console.log(!!lucid);
        lucid &&
            deposit({
                lucid,
                income: data.income,
                priceHight: data.priceHight,
                priceLow: data.priceLow,
                stake: data.stake,
                step: data.step,
                totalADA: data.totalADA,
            })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
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
                                            <span>Balance: 0 ₳</span>
                                        </div>
                                        <div className={cx("form")}>
                                            <Input
                                                name="income"
                                                placeholder="Enter the USD amount for a month"
                                                register={register}
                                                errorMessage={errors.income?.message}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />
                                            <Input
                                                name="priceHight"
                                                placeholder="Enter the highest price"
                                                register={register}
                                                errorMessage={errors.priceHight?.message}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />
                                            <Input
                                                name="priceLow"
                                                placeholder="Enter the lowest price"
                                                register={register}
                                                errorMessage={errors.priceLow?.message}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />
                                            <Input
                                                name="stake"
                                                placeholder="Enter % stake for 1 year"
                                                register={register}
                                                errorMessage={errors.stake?.message}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />
                                            <Input
                                                name="step"
                                                placeholder="Enter the price jump"
                                                register={register}
                                                errorMessage={errors.step?.message}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />
                                            <Input
                                                name="totalADA"
                                                placeholder="Enter the total number of ada"
                                                register={register}
                                                errorMessage={errors.totalADA?.message}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />
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
                                                -
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
                                                -
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
