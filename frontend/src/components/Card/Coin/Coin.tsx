import classNames from "classnames/bind";
import React from "react";
import styles from "./Coin.module.scss";
import { convertNumberToSocialType } from "~/utils/utils";

const cx = classNames.bind(styles);

type Props = {
    buyPrice: number;
    sellPrice: number;
    circulatingSupply: number;
    mintableAmount: number;
    className?: string;
    titles: Record<string, number>;
};



const b: string[] = ["Total wallet", "Total UTxO", "Total Volume Lock", "Total DJED"];

const Coin = function ({ buyPrice, circulatingSupply, mintableAmount, sellPrice, className }: Props) {
    return (
        <div className={cx("body", className)}>
            <div className={cx("buy-price")}>
                <h2 className={cx("title")}>Total wallet</h2>
                <div className={cx("amount")}>
                    <span>{convertNumberToSocialType(buyPrice)}</span>
                    <span className={cx("suffix")}>₳</span>
                </div>
            </div>
            <div className={cx("sell-price")}>
                <h2 className={cx("title")}>Total UTxO</h2>
                <div className={cx("amount")}>
                    <span>{convertNumberToSocialType(sellPrice)}</span>
                    <span className={cx("suffix")}>₳</span>
                </div>
            </div>
            <div className={cx("circulating-supply")}>
                <h2 className={cx("title")}>Total Volume Lock</h2>
                <div className={cx("amount")}>
                    <span>{convertNumberToSocialType(circulatingSupply)}</span>
                </div>
            </div>
            <div className={cx("mintable-amount")}>
                <h2 className={cx("title")}>Total DJED</h2>
                <div className={cx("amount")}>
                    <span>{convertNumberToSocialType(mintableAmount)}</span>
                </div>
            </div>
        </div>
    );
};
export default Coin;
