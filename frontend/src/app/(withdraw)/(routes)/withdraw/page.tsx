"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders/Orders";
import styles from "./Withdraw.module.scss";
import Image from "next/image";
import images from "~/assets/images";
import dynamic from "next/dynamic";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import ccxt, { binance } from "ccxt";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import Tippy from "~/components/Tippy";
import Input from "~/components/Input";
import { useForm } from "react-hook-form";
import InputRange from "~/components/InputRange";
import DropdownMenu from "~/components/DropdownMenu";
import { Item } from "~/components/DropdownMenu/DropdownMenu";
import { ChartDataType } from "~/types/GenericsType";
import { AccountContextType } from "~/types/contexts/AccountContextType";
import AccountContext from "~/contexts/components/AccountContext";
import { get } from "~/utils/http-requests";
import { useQuery } from "@tanstack/react-query";

const PriceChart = dynamic(() => import("~/components/PriceChart"), {
    ssr: false,
});

type WithdrawType = {
    amount: number;
};

const cx = classNames.bind(styles);

export enum WithdrawMode {
    All,
    Profit,
    Part,
}

const WITHDRAW_MODES: Item[] = [
    { name: "Withdraw profit + staked money", id: WithdrawMode.All },
    { name: "Withdraw all profit", id: WithdrawMode.Profit },
    { name: "Withdraw in parts", id: WithdrawMode.Part },
];

const Withdraw = function () {
    const { account } = useContext<AccountContextType>(AccountContext);

    const [page, setPage] = useState<number>(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ["transaction", page],
        queryFn: function () {
            return get("/transaction", {
                account_id: account?.id,
                page: page,
            });
        },
        enabled: !Boolean(account?.id),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WithdrawType>();
    const [currentWithdrawMode, setCurrentWithdrawMode] = useState<Item>(WITHDRAW_MODES[0]);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { waitingWithdraw, withdraw } = useContext<SmartContractContextType>(SmartContractContext);

    const onWithdraw = handleSubmit(async (data) => {
        try {
            lucid &&
                withdraw({
                    lucid,
                });
        } catch (error) {
            console.warn("Error: ", error);
        }
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
                                <Card title="Mint DJED" icon={icons.djed} className={cx("stat-djed-stablecoin")}>
                                    <form onSubmit={onWithdraw} className={"card-service"}>
                                        <div className={cx("balance")}>
                                            <span>Balance: {0} ₳</span>
                                        </div>
                                        <div className={cx("form-wrapper")}>
                                            <DropdownMenu
                                                classNameWrapper={cx("withdraw-mode-dropdown")}
                                                currentItem={currentWithdrawMode}
                                                selectItem={setCurrentWithdrawMode}
                                                items={WITHDRAW_MODES}
                                            />
                                            <Input
                                                className={cx("input-amount")}
                                                name="amount"
                                                placeholder="Enter the total number of ada"
                                                register={register}
                                                errorMessage={errors.amount?.message}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />

                                            <InputRange
                                                disabled={
                                                    currentWithdrawMode.id === WithdrawMode.All || currentWithdrawMode.id === WithdrawMode.Profit
                                                }
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
                                                {waitingWithdraw ? <Loading /> : "-"}
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
                                                {waitingWithdraw ? <Loading /> : "-"}
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

                                        <Button disabled={!lucid || waitingWithdraw} onClick={onWithdraw} className={cx("withdraw-button")}>
                                            Withdraw
                                        </Button>
                                    </form>
                                </Card>
                                <Image className={cx("coin-image-left")} src={images.coinDjedLeft} alt="coin-djed" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={cx("header-order")}>
                    <h2 className={cx("title")}>Orders</h2>
                </div>
                <Orders data={data} className={cx("orders")} />
            </section>
        </div>
    );
};

export default Withdraw;
