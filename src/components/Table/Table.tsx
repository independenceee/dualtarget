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
                <tr className={cx("table-header")}>
                    <td className={cx("table-header-item")}>Date</td>
                    <td className={cx("table-header-item")}>Tx Hash</td>
                    <td className={cx("table-header-item")}>Action</td>
                    <td className={cx("table-header-item")}>Amount</td>
                    <td className={cx("table-header-item")}>Recieved/Payed</td>
                    <td className={cx("table-header-item")}>Status</td>
                </tr>
                <tbody className={cx("rows")}>
                    <tr className={cx("row")}>
                        <td className={cx("row-item", "date")}>07 Mar, 2024 03:24</td>
                        <td className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </td>
                        <td className={cx("row-item", "action")}>Mint</td>
                        <td className={cx("row-item", "amount")}>Amount</td>
                        <td className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</td>
                        <td className={cx("row-item", "row-status")}>Completed</td>
                    </tr>
                    <tr className={cx("row")}>
                        <td className={cx("row-item", "date")}>07 Mar, 2024 03:24</td>
                        <td className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </td>
                        <td className={cx("row-item", "action")}>Mint</td>
                        <td className={cx("row-item", "amount")}>Amount</td>
                        <td className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</td>
                        <td className={cx("row-item", "row-status")}>Completed</td>
                    </tr>
                    <tr className={cx("row")}>
                        <td className={cx("row-item", "date")}>07 Mar, 2024 03:24</td>
                        <td className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </td>
                        <td className={cx("row-item", "action")}>Mint</td>
                        <td className={cx("row-item", "amount")}>Amount</td>
                        <td className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</td>
                        <td className={cx("row-item", "row-status")}>Completed</td>
                    </tr>
                    <tr className={cx("row")}>
                        <td className={cx("row-item", "date")}>07 Mar, 2024 03:24</td>
                        <td className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </td>
                        <td className={cx("row-item", "action")}>Mint</td>
                        <td className={cx("row-item", "amount")}>Amount</td>
                        <td className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</td>
                        <td className={cx("row-item", "row-status")}>Completed</td>
                    </tr>
                    <tr className={cx("row")}>
                        <td className={cx("row-item", "date")}>07 Mar, 2024 03:24</td>
                        <td className={cx("row-item", "txhash")}>
                            <Link href={""} target="_blanke">
                                e59c....9b46e59c
                            </Link>
                        </td>
                        <td className={cx("row-item", "action")}>Mint</td>
                        <td className={cx("row-item", "amount")}>Amount</td>
                        <td className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</td>
                        <td className={cx("row-item", "row-status")}>Completed</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
