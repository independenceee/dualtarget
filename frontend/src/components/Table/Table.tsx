import React from "react";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import Link from "next/link";
import { HeaderTableType } from "~/types/GenericsType";

const cx = classNames.bind(styles);
type Props = {
    className?: string;
    headerTables: HeaderTableType[];
};
const Table = function ({ className, headerTables }: Props) {
    return (
        <div className={cx("wrapper", className)}>
            <table className={cx("table")}>
                <tr className={cx("table-header")}>
                    {headerTables.map(function (headerTable: HeaderTableType, index: number) {
                        return (
                            <td key={index} className={cx("table-header-item")}>
                                {headerTable.title}
                            </td>
                        );
                    })}
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
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
