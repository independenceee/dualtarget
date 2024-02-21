"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import HeaderOption from "./HeaderOption";
import { publicRoutes } from "~/routes/routes";
import Logo from "~/components/Logo";
import configs from "~/configs";

const cx = classNames.bind(styles);

const Header = function () {
    const [selected, setSelected] = useState<string>(configs.routes.home);

    return (
        <header className={cx("header")}>
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-inner")}>
                    <div className={cx("logo")}>
                        <Logo />
                    </div>
                    <nav className={cx("navbar")}>
                        <ul className={cx("nav-list")}>
                            {publicRoutes.map(function ({ name, redirect }, index: number) {
                                return (
                                    <HeaderOption
                                        key={index}
                                        name={name}
                                        redirect={redirect}
                                        isActive={Boolean(selected === redirect)}
                                        setSelected={setSelected}
                                    />
                                );
                            })}
                        </ul>
                    </nav>
                    <div className={cx("nav-right-wrapper")}>
                        {/* <ConnectWallet />
                        <Hamburger /> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
