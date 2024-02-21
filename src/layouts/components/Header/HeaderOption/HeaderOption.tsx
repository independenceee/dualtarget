import React, { useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./HeaderOption.module.scss";

const cx = classNames.bind(styles);

type Props = {
    redirect: string;
    name: string;
    isActive: boolean;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
};

const HeaderOption = function ({ redirect, name, isActive, setSelected, className }: Props) {
    const handleClickNavItem = function (redirect: string) {
        setSelected(redirect);
    };

    return (
        <li className={cx("nav-item")}>
            <Link
                onClick={() => handleClickNavItem(redirect)}
                href={redirect}
                className={cx("nav-item-link", { "nav-item-link-active": isActive }, className)}
            >
                {name}
            </Link>
        </li>
    );
};

export default HeaderOption;
