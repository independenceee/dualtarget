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
                    <th className={cx("header-item")}>Date</th>
                    <th className={cx("header-item")}>Tx Hash</th>
                    <th className={cx("header-item")}>Action</th>
                    <th className={cx("header-item")}>Amount</th>
                    <th className={cx("header-item")}>Recieved/Payed</th>
                    <th className={cx("header-item")}>Status</th>
                </tr>
                <tr className={cx("row")}>
                    <td className={cx("row-item", "row-date")}>07 Mar, 2024 03:24</td>
                    <td className={cx("row-item", "row-txhash")}>
                        <Link href={""} target="_blanke">
                            e59c....9b46e59c....9b46e59c....9b46
                        </Link>
                    </td>
                    <td className={cx("row-item", "row-action")}>Mint</td>
                    <td className={cx("row-item", "row-action")}>Amount</td>
                    <td className={cx("row-item", "row-get-or-pay")}>13,971.26 ₳</td>
                    <td className={cx("row-item", "row-status")}>Completed</td>
                </tr>
            </table>
        </div>
    );
};

export default Table;
