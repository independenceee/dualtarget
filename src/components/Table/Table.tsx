import React from "react";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import Link from "next/link";

const cx = classNames.bind(styles);
type Props = {
    className?: string;
};
const Table = function ({ className }: Props) {
    return (
        <div className={cx("wrapper", className)}>
            <table className={cx("table")}>
                <thead className={cx("table-header")}>
                    <td className={cx("table-header-item")}>Date</td>
                    <td className={cx("table-header-item")}>Tx Hash</td>
                    <td className={cx("table-header-item")}>Action</td>
                    <td className={cx("table-header-item")}>Amount</td>
                    <td className={cx("table-header-item")}>Recieved/Payed</td>
                    <td className={cx("table-header-item")}>Status</td>
                </thead>
                <tbody className={cx("rows")}>
                    <section className={cx("row")}>
                        <div className={cx("row-item", "date")}>07 Mar, 2024 03:24</div>
                        <div className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </div>
                        <div className={cx("row-item", "action")}>Mint</div>
                        <div className={cx("row-item", "amount")}>Amount</div>
                        <div className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</div>
                        <div className={cx("row-item", "row-status")}>Completed</div>
                    </section>
                    <section className={cx("row")}>
                        <div className={cx("row-item", "date")}>07 Mar, 2024 03:24</div>
                        <div className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </div>
                        <div className={cx("row-item", "action")}>Mint</div>
                        <div className={cx("row-item", "amount")}>Amount</div>
                        <div className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</div>
                        <div className={cx("row-item", "row-status")}>Completed</div>
                    </section>
                    <section className={cx("row")}>
                        <div className={cx("row-item", "date")}>07 Mar, 2024 03:24</div>
                        <div className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </div>
                        <div className={cx("row-item", "action")}>Mint</div>
                        <div className={cx("row-item", "amount")}>Amount</div>
                        <div className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</div>
                        <div className={cx("row-item", "row-status")}>Completed</div>
                    </section>
                    <section className={cx("row")}>
                        <div className={cx("row-item", "date")}>07 Mar, 2024 03:24</div>
                        <div className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </div>
                        <div className={cx("row-item", "action")}>Mint</div>
                        <div className={cx("row-item", "amount")}>Amount</div>
                        <div className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</div>
                        <div className={cx("row-item", "row-status")}>Completed</div>
                    </section>
                    <section className={cx("row")}>
                        <div className={cx("row-item", "date")}>07 Mar, 2024 03:24</div>
                        <div className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </div>
                        <div className={cx("row-item", "action")}>Mint</div>
                        <div className={cx("row-item", "amount")}>Amount</div>
                        <div className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</div>
                        <div className={cx("row-item", "row-status")}>Completed</div>
                    </section>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
