import React, { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SidebarMenu.module.scss";
import Image from "next/image";
import NetworkSelector from "../NetworkSelector";
import { networks } from "~/constants/networks";
import { publicRoutes } from "~/routes/routes";
import HeaderOption from "~/layouts/components/Header/HeaderOption";
import configs from "~/configs";

const cx = classNames.bind(styles);

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarMenu = function ({ open, setOpen }: Props) {
    const [selected, setSelected] = useState<string>(configs.routes.home);

    return (
        <div>
            <div
                className={cx("wrapper", {
                    open,
                })}
            >
                <button className={cx("connect-wallet-button")}>Connect Wallet</button>
                <NetworkSelector networks={networks} className={cx("network-selector")} />
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
                                    className={cx("nav-item-link")}
                                />
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SidebarMenu;
