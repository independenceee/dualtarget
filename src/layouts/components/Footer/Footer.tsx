import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

const Footer = function () {
    return (
        <footer className={cx("wrapper")}>
            <div className={cx("wrapper-inner")}>
                <div className={cx("term-and-whitepaper")}>
                    <span className={cx("term")}>Term of Use</span>
                    <span className={cx("whitepaper")}>Whitepaper</span>
                </div>
                <div className={cx("corporation")}>
                    <span>Powered by</span>
                    <span className={cx("corporation-logo")}>
                        <Image src={icons.corporation} alt="coti" />
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
