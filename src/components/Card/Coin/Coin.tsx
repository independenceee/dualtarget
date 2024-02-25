import classNames from "classnames/bind";
import React from "react";
import styles from "./Coin.module.scss";

const cx = classNames.bind(styles);

type Props = {
    buyPrice: number;
    sellPrice: number;
    circulatingSupply: number;
    mintableAmount: number;
    className?: string;
};

const Coin = function ({ buyPrice, circulatingSupply, mintableAmount, sellPrice, className }: Props) {
    return (
        <div className={cx("body", className)}>
            <div className={cx("buy-price")}>
                <h2 className={cx("title")}>Buy Price</h2>
                <div className={cx("amount")}>
                    <span>{buyPrice}</span>
                    <span className={cx("suffix")}>₳</span>
                </div>
            </div>
            <div className={cx("sell-price")}>
                <h2 className={cx("title")}>Sell Price</h2>
                <div className={cx("amount")}>
                    <span>{sellPrice}</span>
                    <span className={cx("suffix")}>₳</span>
                </div>
            </div>
            <div className={cx("circulating-supply")}>
                <h2 className={cx("title")}>Circulating Supply</h2>
                <div className={cx("amount")}>
                    <span>{circulatingSupply}</span>
                </div>
            </div>
            <div className={cx("mintable-amount")}>
                <h2 className={cx("title")}>Mintable Amount</h2>
                <div className={cx("amount")}>
                    <span>{mintableAmount}</span>
                </div>
            </div>
        </div>
    );
};
export default Coin;
