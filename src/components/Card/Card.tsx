import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import Image from "next/image";
import Button from "../Button";
import Gutter from "./Gutter";

const cx = classNames.bind(styles);

type Props = {
    icon: string | StaticImport;
    title: string;
    buyPrice: number;
    sellPrice: number;
    circulatingSupply: number;
    mintableAmount: number;
    className?: string;
};

const Card = function ({ icon, title, buyPrice, sellPrice, circulatingSupply, mintableAmount, className }: Props) {
    return (
        <Gutter className={className}>
            <div className={cx("header")}>
                <div className={cx("icon-wrapper")}>
                    <div className={cx("icon-frame")} />
                    <Image src={icon} alt={title} className={cx("icon")} />
                </div>
                <span className={cx("header-title")}>{title}</span>
            </div>
            <div className={cx("body")}>
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
            <div>
                <Button className={cx("button")}>Mint/Burn</Button>
            </div>
        </Gutter>
    );
};

export default Card;
