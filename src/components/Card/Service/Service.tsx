import classNames from "classnames/bind";
import React from "react";
import styles from "./Service.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import Tippy from "~/components/Tippy";
const cx = classNames.bind(styles);

type Props = {
    balance?: number;
    cost?: number;
    fees?: number;
    currency?: string;
    minimalADArequirement?: number;
    className?: string;
    min?: number;
    max?: number;
    type: "PAY" | "GET";
};

const Service = function ({ type }: Props) {
    return (
        <div className="wrapper">
            <div className={cx("balance")}>
                <span>Balance: 0 ₳</span>
            </div>
            <form className={cx("form")}>
                <section className={cx("search")}>
                    <div className={cx("search-input")}>
                        <input type="text" placeholder="Enter SHEN amount (Min: 200)" />
                    </div>
                </section>
            </form>
            <div className={cx("amount-slider-container")}>
                <div className={cx("percentage")}>
                    <div className={cx("percentage_min_max")}>
                        <p className="disabled">MIN</p>
                        <Tippy render={<div>Calculated based on the contract minimum amount parameters.</div>}>
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </div>
                    <div className={cx("percentage_min_max")}>
                        <p className="disabled">MAX</p>
                        <Tippy placement="top-end" render={<div>Calculate based on the available mintable amount and your wallet balance.</div>}>
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </div>
                </div>
                <div className={cx("slider-input-group")}>
                    <input className={cx("slider-input")} type="range" min={0} max={1} step="0.01" defaultValue={0} />{" "}
                    <div className={cx("cover_lines")}>
                        <div className={cx("vertical-line")}>
                            <Image src={icons.separate} alt="separate" />
                        </div>
                        <div className={cx("vertical-line")}>
                            <Image src={icons.separate} alt="separate" />
                        </div>
                        <div className={cx("vertical-line")}>
                            <Image src={icons.separate} alt="separate" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("info")}>
                <div className={cx("stats")}>
                    <div className={cx("title-wrapper")}>
                        <span>Cost</span>
                        <Tippy render={<div>Amount includes a 1.5% mint fee</div>}>
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </div>
                    -
                </div>
                <div className={cx("stats")}>
                    <div className={cx("title-wrapper")}>
                        <span>Fees</span>
                        <Tippy
                            render={
                                <div>
                                    <div className={cx("stats-fee")}>
                                        <span>Request Fee</span>
                                        <span>-</span>
                                    </div>
                                    <div className={cx("stats-fee")}>
                                        <span>Operator Fee</span>
                                        <span>-</span>
                                    </div>
                                </div>
                            }
                        >
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </div>
                    -
                </div>
                <div className={cx("stats")}>
                    <div className={cx("title-wrapper")}>{type === "PAY" ? <span>You will pay</span> : <span>You will get</span>}</div>-
                </div>
                <div className={cx("stats")}>
                    <div className={cx("title-wrapper")}>
                        <span>Minimal ADA requirement</span>
                        <Tippy
                            placement="top"
                            render={
                                <div>
                                    This amount will be reimbursed once the order is processed, irrespective of whether the order is a success or not.
                                    <a
                                        className={cx("tippy-content-link")}
                                        href="https://docs.cardano.org/native-tokens/minimum-ada-value-requirement/"
                                        target="_blank"
                                    >
                                        Why is it required?
                                    </a>
                                </div>
                            }
                        >
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </div>
                    -
                </div>
            </div>
        </div>
    );
};

export default Service;
