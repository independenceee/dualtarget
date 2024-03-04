import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import Link from "next/link";
import routes from "~/configs/routes";

const cx = classNames.bind(styles);

const Footer = function () {
    return (
        <footer className={cx("wrapper")}>
            <div className={cx("wrapper-inner")}>
                <div className={cx("term-and-whitepaper")}>
                    <Link href={routes.term} className={cx("term")}>
                        Term of Use
                    </Link>
                    <a href="https://eprint.iacr.org/2021/1069.pdf" className={cx("whitepaper")}>
                        Whitepaper
                    </a>
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
