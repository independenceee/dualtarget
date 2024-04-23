"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./DelegationRewards.module.scss";
import Tippy from "~/components/Tippy";
import Image from "next/image";
import icons from "~/assets/icons";
import Table from "~/components/Table";
import Pagination from "~/components/Pagination";
const cx = classNames.bind(styles);

const DelegationRewards = function () {
    const [page, setPage] = useState<number>(1);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <h1 className={cx("title")}>Delegation Rewards for ADA holders</h1>
                <h2 className={cx("sub-title")}>Check your ADA rewards</h2>
                <form className={cx("form")}>
                    <section className={cx("label")}>
                        <div className={cx("input-name")}>Address</div>
                        <Tippy render={<div>Please enter your Cardano address eligible for deligation rewards.</div>}>
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </section>
                    <section className={cx("search")}>
                        <div className={cx("search-input")}>
                            <input type="text" placeholder="Enter address to load the data" />
                        </div>
                        <div className={cx("search-delete")} />
                    </section>
                </form>

                <section className={cx("summary")}>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>Current Epoch</h2>
                        <p className={cx("summary-description")}>
                            <Link className={cx("summary-link")} href={""} target="_blank">
                                468
                            </Link>
                        </p>
                    </div>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>Total Distributed Rewards</h2>
                        <p className={cx("summary-description")}>
                            {false ? (
                                <Link className={cx("summary-link")} href={""} target="_blank">
                                    468
                                </Link>
                            ) : (
                                <span className={cx("no-data-hyphen")}>-</span>
                            )}
                        </p>
                    </div>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>Total Pending Rewards</h2>
                        <p className={cx("summary-description")}>
                            {false ? (
                                <Link className={cx("summary-link")} href={""} target="_blank">
                                    468
                                </Link>
                            ) : (
                                <span className={cx("no-data-hyphen")}>-</span>
                            )}
                        </p>
                    </div>
                </section>

                {false ? (
                    <section className={cx("status")}>
                        <div className={cx("no-data")} />
                        <span>No available data</span>
                    </section>
                ) : (
                    <div>
                        <Table data={[]} />
                        <Pagination totalPages={5} page={1} setPage={setPage} totalItems={20} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DelegationRewards;
