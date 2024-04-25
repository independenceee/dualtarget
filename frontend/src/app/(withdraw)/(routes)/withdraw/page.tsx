"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders/Orders";
import styles from "./Withdraw.module.scss";
import Image from "next/image";
import images from "~/assets/images";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import Tippy from "~/components/Tippy";
import Input from "~/components/Input";
import { useForm } from "react-hook-form";
import InputRange from "~/components/InputRange";
import DropdownMenu from "~/components/DropdownMenu";
import { Item } from "~/components/DropdownMenu/DropdownMenu";
import { useQuery } from "@tanstack/react-query";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import { CalculateSellingStrategy, ChartDataType, ChartHistoryRecord, ClaimableUTxO, TransactionResponseType } from "~/types/GenericsType";
import axios from "axios";
import CustomChart from "~/components/CustomChart";
import CountUp from "react-countup";
import { useDebounce } from "~/hooks";

type WithdrawType = {
    amount: number;
};

const cx = classNames.bind(styles);

const WITHDRAW_MODES: Item[] = [
    { name: "All", id: 0 },
    { name: "Only profit", id: 1 },
    { name: "Select parts", id: 2 },
];

const Withdraw = function () {
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { waitingWithdraw, withdraw, calcualateClaimEutxo, previewWithdraw } = useContext<SmartContractContextType>(SmartContractContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const [page, setPage] = useState<number>(1);
    const [claimableUtxos, setClaimableUtxos] = useState<Array<ClaimableUTxO>>([]);
    const [sellingStrategies, setSellingStrategies] = useState<CalculateSellingStrategy[]>([]);
    const [currentWithdrawMode, setCurrentWithdrawMode] = useState<Item>(WITHDRAW_MODES[0]);
    const [withdrawableProfit, setWithdrawableProfit] = useState<number[]>([0, 0]);
    const debouncedValue = useDebounce<number[]>(withdrawableProfit);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Transactions", page],
        queryFn: () =>
            axios.get<TransactionResponseType>(
                `${window.location.origin}/history/transaction?wallet_address=${wallet?.address}&page=${page}&page_size=5`,
                { timeout: 5000 },
            ),
        enabled: !!Boolean(wallet?.address),
    });

    const {
        data: chartDataRecords,
        isLoading: isGetChartRecordsLoading,
        isSuccess: isGetChartRecordsSuccess,
    } = useQuery({
        queryKey: ["ChartData"],
        queryFn: () => axios.get<ChartHistoryRecord[] | null>(`${window.location.origin}/chart`),
        refetchInterval: 5 * 60 * 1000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<WithdrawType>();

    const maxOfSellingStrategies = useMemo(() => {
        if (sellingStrategies.length > 0) {
            return (
                Math.max(
                    ...sellingStrategies.map(({ buyPrice }) => {
                        return (Number(buyPrice) as number) / 1000000;
                    }),
                ) + 0.5
            );
        }

        return 0;
    }, [sellingStrategies]);

    useEffect(() => {
        const [min, max] = debouncedValue;
        lucid &&
            calcualateClaimEutxo({
                lucid,
                mode: currentWithdrawMode.id,
                min,
                max,
            }).then((res: ClaimableUTxO[]) => {
                console.log(res);

                setClaimableUtxos(res); // TODO: CÓA ĐI KHÔNG THÌ SAI
                const amount = (res as ClaimableUTxO[]).reduce((acc, claim) => acc + Number(claim.utxo.assets.lovelace), 0);
                setValue("amount", amount / 1000000);
            });
    }, [calcualateClaimEutxo, currentWithdrawMode, lucid, setValue, debouncedValue]);

    useEffect(() => {
        if (lucid) {
            previewWithdraw({ lucid }).then((response) => {
                setSellingStrategies(response);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lucid]);

    const historyPrices: ChartDataType = useMemo(() => {
        if (isGetChartRecordsSuccess && chartDataRecords.data) {
            const prices = chartDataRecords.data.map((history) => [+history.closeTime, +history.high]);
            return prices as ChartDataType;
        }
        return [];
    }, [chartDataRecords, isGetChartRecordsSuccess]);

    const onWithdraw = handleSubmit(async (data) => {
        try {
            lucid &&
                withdraw({
                    lucid,
                    claimableUtxos,
                });
        } catch (error) {
            console.warn("Error: ", error);
        }
    });

    const onRangeChange = function (value: number[]) {
        setWithdrawableProfit(value);
    };

    return (
        <div className={cx("wrapper")}>
            <section className={cx("header-wrapper")}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>Withdraw asset</h2>
                </div>
                <div className={cx("stats")}>
                    <div className={cx("stats-inner")}>
                        <div className={cx("stats")}>
                            <div className={cx("card-wrapper")}>
                                <Card title="Withdraw" icon={images.logo} className={cx("stat-djed-stablecoin")}>
                                    <form onSubmit={onWithdraw} className={"card-service"}>
                                        <div className={cx("balance")}>
                                            <span>
                                                Balance: <CountUp end={wallet?.balance || 0} start={0} /> ₳
                                            </span>
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
                                                disabled={true}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "This field is required",
                                                    },
                                                }}
                                            />

                                            <InputRange
                                                onChange={onRangeChange}
                                                min={0}
                                                max={Number(maxOfSellingStrategies.toFixed(4))}
                                                disabled={currentWithdrawMode.id === 0 || currentWithdrawMode.id === 1}
                                            />
                                        </div>

                                        <div className={cx("info")}>
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
                                                    <span>You will receive</span>
                                                </div>
                                                {waitingWithdraw ? <Loading /> : "-"}
                                            </div>
                                        </div>

                                        <Button disabled={!lucid || waitingWithdraw} onClick={onWithdraw} className={cx("withdraw-button")}>
                                            Withdraw
                                        </Button>
                                    </form>
                                </Card>
                                <Image className={cx("coin-image-left")} src={images.coinDjedLeft} alt="coin-djed" />
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
                <Orders page={page} setPage={setPage} data={data?.data} isError={isError} isLoading={isLoading} className={cx("orders")} />
            </section>
        </div>
    );
};

export default Withdraw;
