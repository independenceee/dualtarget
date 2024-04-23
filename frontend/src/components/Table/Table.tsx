import React, { useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import Link from "next/link";
import { HeaderTableType, TransactionHistoryType } from "~/types/GenericsType";

const cx = classNames.bind(styles);
type Props = {
    className?: string;
    data: TransactionHistoryType[];
};
const Table = function ({ className, data }: Props) {
    
    return (
        <div className={cx("wrapper", className)}>
            <table className={cx("table")}>
                <thead>
                    <tr className={cx("table-header")}>
                        <td className={cx("table-header-item")}>Block Time</td>
                        <td className={cx("table-header-item")}>Transaction Hash</td>
                        <td className={cx("table-header-item")}>Action</td>
                        <td className={cx("table-header-item")}>Amount</td>
                        <td className={cx("table-header-item")}>Fees</td>
                        <td className={cx("table-header-item")}>Status</td>
                    </tr>
                </thead>
                <tbody className={cx("rows")}>
                    {data &&
                        data.map((item, index) => (
                            <tr className={cx("row")} key={index}>
                                <td className={cx("row-item", "dae")}>{item.blockTime}</td>
                                <td className={cx("row-item", "txhash")}>
                                    <Link href={""} target="_blanke">
                                        {item.txHash}
                                    </Link>
                                </td>
                                <td className={cx("row-item", "action")}>{item.type}</td>
                                <td className={cx("row-item", "amount")}>{item.amount}</td>
                                <td className={cx("row-item", "amount")}>{item.fee}</td>
                                <td className={cx("row-item", "amount")}>{item.status}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
