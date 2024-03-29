import React from "react";
import classNames from "classnames/bind";
import styles from "~/app/(faq)/(routes)/faq/FrequentlyAskedQuestion.module.scss";
import Image from "next/image";
const cx = classNames.bind(styles);
const faqs = [
    {
        title: "",
        Children: function () {
            return (
                <span className={cx("faq-description")}>
                    <p>
                        DJED is an overcollateralized stablecoin that uses exogenous collateral (ADA) to ensure stability. The protocol is backed by
                        400-800% overcollateralization and is guaranteed by its reserve coin, SHEN. The stability of DJED is based on
                        overcollateralization, which eliminates the need for trust in a governance token as seen in algorithmic stablecoins. The
                        platform is also fully decentralized and community-driven, allowing for open-source development and community involvement in
                        minting and burning DJED and SHEN.
                    </p>
                    <p>
                        <Image src={""} alt="" />
                    </p>
                </span>
            );
        },
    },
    {
        title: "",
        Children: function () {
            return (
                <span>
                    <p>
                        <b></b>
                    </p>
                    <p>
                        <Image src={""} alt="" />
                    </p>
                </span>
            );
        },
    },
    {
        title: "",
        Children: function () {
            return (
                <span>
                    <p>
                        <b></b>
                    </p>
                    <p>
                        <Image src={""} alt="" />
                    </p>
                </span>
            );
        },
    },
    {
        title: "",
        Children: function () {
            return (
                <span>
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                </span>
            );
        },
    },
];
