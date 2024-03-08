import classNames from "classnames/bind";
import React from "react";
import styles from "./Orders.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import Table from "~/components/Table";

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
        <div className={cx("table-wrapper")}>
            <Table className={cx("order-table")} />
        </div>
        //     )}
        // </div>
    );
};

export default Orders;
