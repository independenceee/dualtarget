"use client";

import classNames from "classnames/bind";
import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "./DelegationRewards.module.scss";
import Tippy from "~/components/Tippy";
import Image from "next/image";
import icons from "~/assets/icons";
import Table from "~/components/Table";
import Pagination from "~/components/Pagination";
import { historyRewards } from "~/constants/header-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DelegationRewardResponseType } from "~/types/GenericsType";
import Loading from "~/components/Loading";
import { useDebounce } from "~/hooks";
import Reward from "~/components/Reward";
import TranslateContext from "~/contexts/components/TranslateContext";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";
import { DelegationRewardContextType } from "~/types/contexts/DelegationRewardContextType";
import DelegationRewardContext from "~/contexts/components/DelegationRewardContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
const cx = classNames.bind(styles);

const DelegationRewards = function () {
    const [page, setPage] = useState<number>(1);
    const { t } = useContext(TranslateContext);
    const { lucidPlatform } = useContext<LucidContextType>(LucidContext);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const { network, enviroment } = useContext<NetworkContextType>(NetworkContext);
    const { caculateADAPool } = useContext<DelegationRewardContextType>(DelegationRewardContext);
    const debouncedValue = useDebounce(walletAddress);
    
    const {
        data: rewards,
        isSuccess,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["Rewards", debouncedValue, page],
        queryFn: async function () {
            const paymentAddress = lucidPlatform.utils.getAddressDetails(debouncedValue as string)
                .paymentCredential?.hash;
            const ADAPool = await caculateADAPool({
                walletAddress: debouncedValue as string,
                enviroment: enviroment,
                lucidPlatform: lucidPlatform,
            });
            return axios.get<DelegationRewardResponseType>(
                `${
                    window.location.origin
                }/api/history/reward?wallet_address=${debouncedValue}&payment_address=${paymentAddress}&ada_pool=${ADAPool}&page=${page}&page_size=5&network=${network.toLowerCase()}`,
            );
        },
        enabled: !!debouncedValue,
    });

 

    const handleChangeWalletAddress = function (e: React.ChangeEvent<HTMLInputElement>) {
        setWalletAddress(e.target.value);
    };

    const handleClearInput = function () {
        setWalletAddress("");
    };

    return (
        <div className={cx("wrapper")}>
            <title>Delegation Reward - Dualtarget</title>
            <div className={cx("container")}>
                <h1 className={cx("title")}>{t("delegation rewards.card.title")}</h1>
                <h2 className={cx("sub-title")}>{t("delegation rewards.card.sub title")}</h2>
                <form className={cx("form")}>
                    <section className={cx("label")}>
                        <div className={cx("input-name")}>
                            {t("delegation rewards.card.fields.address.title")}
                        </div>
                        <Tippy
                            render={
                                <div>{t("delegation rewards.card.fields.address.instruction")}</div>
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
                    </section>
                    <div className={cx("form-content-wrapper")}>
                        <section className={cx("search")}>
                            <div className={cx("search-input")}>
                                <input
                                    className={cx("input")}
                                    value={walletAddress}
                                    onChange={handleChangeWalletAddress}
                                    type="text"
                                    placeholder={t(
                                        "delegation rewards.card.fields.address.placeholder",
                                    )}
                                />
                            </div>
                            <div
                                className={cx("search-delete", {
                                    show: walletAddress,
                                })}
                                onClick={handleClearInput}
                            />
                        </section>
                        {/* <Button disabled={!Boolean(walletAddress)} className={cx("submit-button")} type="button" onClick={handleDelegateRewards}>
                            Submit
                        </Button> */}
                    </div>
                </form>

                <section className={cx("summary")}>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>
                            {t("delegation rewards.card.current epoch")}
                        </h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <div>
                                    {isSuccess && rewards.data.histories.length > 0 ? (
                                        <Link
                                            className={cx("summary-link")}
                                            href={""}
                                            target="_blank"
                                        >
                                            {Math.max(
                                                ...rewards.data.histories.map(({ epoch }) => epoch),
                                            )}
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </div>
                            )}
                        </p>
                    </div>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>
                            {t("delegation rewards.card.total distributed rewards")}
                        </h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <>
                                    {isSuccess && rewards.data.histories.length > 0 ? (
                                        <Link
                                            className={cx("summary-link")}
                                            href={""}
                                            target="_blank"
                                        >
                                            {rewards.data.histories.reduce(
                                                (acc, history) =>
                                                    Number(acc) + Number(history.rewards),
                                                0,
                                            )}{" "}
                                            ₳
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </>
                            )}
                        </p>
                    </div>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>
                            {t("delegation rewards.card.total pending rewards")}
                        </h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <>
                                    {isSuccess && rewards.data.histories.length > 0 ? (
                                        <Link
                                            className={cx("summary-link")}
                                            href={""}
                                            target="_blank"
                                        >
                                            0 ₳
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </>
                            )}
                        </p>
                    </div>
                </section>

                {isLoading ? (
                    <div className={cx("loading-wrapper")}>
                        <Loading className={cx("loading")} />
                    </div>
                ) : (
                    <div>
                        {isSuccess && (
                            <div>
                                {rewards.data.histories.length === 0 ? (
                                    <section className={cx("status")}>
                                        <div className={cx("no-data")} />
                                        <span>{t("layout.notification.no data")}</span>
                                    </section>
                                ) : (
                                    <div>
                                        <Table
                                            center
                                            titles={historyRewards}
                                            data={rewards?.data.histories}
                                            className={cx("desktop-tx-history")}
                                        />
                                        <div className={cx("reponsive-tx-history")}>
                                            {rewards.data.histories.map(function (item, index) {
                                                return <Reward data={item} key={index} />;
                                            })}
                                        </div>
                                        {rewards.data.histories.length > 0 && (
                                            <Pagination
                                                totalPages={rewards.data.totalPage}
                                                page={page}
                                                setPage={setPage}
                                                totalItems={rewards.data.totalItems}
                                            />
                                        )}

                                        <div className={cx("note")}>
                                            <p>
                                                * Reward amount lower than 2 ₳ will be added to
                                                pending rewards
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {isError && (
                            <section className={cx("status")}>
                                <div className={cx("no-data")} />
                                <span>{t("layout.notification.error to fetch data")}</span>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DelegationRewards;
