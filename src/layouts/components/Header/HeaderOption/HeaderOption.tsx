import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderOption.module.scss";
import Link from "next/link";

const cx = classNames.bind(styles);

type Props = {
    redirect: string;
    name: string;
    isActive: boolean;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const HeaderOption = function ({ redirect, name, isActive, setSelected }: Props) {
    const handleClickNavItem = function (redirect: string) {
        setSelected(redirect);
    };

    return (
        <li className={cx("nav-item")}>
            <Link onClick={() => handleClickNavItem(redirect)} href={redirect} className={cx("nav-item-link", { "nav-item-link-active": isActive })}>
                {name}
            </Link>
        </li>
    );
};

export default HeaderOption;
