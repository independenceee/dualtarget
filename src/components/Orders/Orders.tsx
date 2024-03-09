"use client";

import classNames from "classnames/bind";
import React from "react";
import styles from "./Orders.module.scss";
import Table from "~/components/Table";
import Expand from "~/components/Expand/Expand";
import Pagination from "~/components/Pagination";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
    data?: any[];
};

const Orders = ({ className }: Props) => {
    return (
        // <div className={cx("wrapper", className)}>
        //     {false ? (
        //         <div className={cx("no-data")}>
        //             <div className={cx("icon-wrapper")}>
        //                 <Image src={icons.glass} className={cx("icon")} alt="search-icon" />
        //             </div>
        //             <p className={cx("notification")}>Connect to view your mint and burn requests</p>
        //         </div>
        //     ) : (
        <>
            <div className={cx("table-wrapper")}>
                <Table className={cx("order-table")} />
                <Pagination pageSize={5} totalItems={20} />
            </div>
            <div>
                <div className={cx("transaction-accordions")}>
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <Expand key={index} className={cx("accordion-item")} />
                        ))}
                </div>
                <Pagination pageSize={5} totalItems={20} />
            </div>
        </>
        //     )}
        // </div>
    );
};

export default Orders;
