import classNames from "classnames/bind";
import React from "react";
import styles from "./Orders.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
    data?: any[];
};

const Orders = ({ className }: Props) => {
    return (
        <div className={cx("wrapper", className)}>
            <div className={cx("no-data")}>
                <div className={cx("icon-wrapper")}>
                    <Image src={icons.glass} className={cx("icon")} alt="search-icon" />
                </div>
                <p className={cx("notification")}>Connect to view your mint and burn requests</p>
            </div>
        </div>
    );
};

export default Orders;
