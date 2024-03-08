import React from "react";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import Link from "next/link";

type Props = {};

const cx = classNames.bind(styles);

const Table = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <section className={cx("header-item")}>
                    <p className={cx("header-item-text")}>Date</p>
                </section>
                <section className={cx("header-item")}>
                    <p className={cx("header-item-text")}>Tx Hash</p>
                </section>
                <section className={cx("header-item")}>
                    <p className={cx("header-item-text")}>Action</p>
                </section>
                <section className={cx("header-item")}>
                    <p className={cx("header-item-text")}>Amount</p>
                </section>
                <section className={cx("header-item")}>
                    <p className={cx("header-item-text")}>Recieved/Payed</p>
                </section>
                <section className={cx("header-item")}>
                    <p className={cx("header-item-text")}>Status</p>
                </section>
            </header>
            <aside className={cx("rows")}>
                <div className={cx("row")}>
                    <div className={cx("row-date")}>
                        <span>07 Mar, 2024 03:24</span>
                    </div>
                    <div className={cx("row-txhash")}>
                        <span>
                            <Link href={""} target="_blanke">
                                e59c....9b46
                            </Link>
                        </span>
                    </div>
                    <div className={cx("row-action")}>
                        <span>Mint</span>
                    </div>
                    <div className={cx("row-action")}>
                        <span>Amount</span>
                    </div>
                    <div className={cx("row-get-or-pay")}>
                        <span>13,971.26 ₳</span>
                    </div>
                    <div className={cx("row-status")}>
                        <span>Completed</span>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Table;
