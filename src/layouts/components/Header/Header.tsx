"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import HeaderOption from "./HeaderOption";
import { publicRoutes } from "~/routes/routes";
import configs from "~/configs";
import Image from "next/image";
import images from "~/assets/images";
import NetworkSelector from "~/components/NetworkSelector";
import { networks } from "~/constants/networks";
import Hamburger from "~/components/Hamburger";
import ConnectWallet from "../ConnectWallet";

const cx = classNames.bind(styles);

const Header = function () {
    const [selected, setSelected] = useState<string>(configs.routes.home);
    return (
        <header className={cx("header")}>
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-inner")}>
                    <div className={cx("nav-left-wrapper")}>
                        <div className={cx("logo-wrapper")}>
                            <Image width={42} height={42} src={images.logo} alt="dual-target" className={cx("logo")} />
                        </div>
                        <NetworkSelector networks={networks} />
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
                        <ConnectWallet />
                        <Hamburger />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
