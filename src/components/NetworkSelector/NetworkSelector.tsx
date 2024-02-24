import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./NetworkSelector.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import { networks } from "~/constants/networks";
import { Network } from "~/types/GenericsType";

const cx = classNames.bind(styles);

type Props = {
    networks: Network[];
    classNames?: {
        classNameWrapper?: string;
        classNameNetworkList?: string;
        classNameArrow?: string;
    };
};

const NetworkSelector = function ({ networks, classNames }: Props) {
    const [currentNetwork, setCurrentNetwork] = useState<string>(networks[0].networkName);
    const [isShownNetworks, setIsShowNetworks] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = function () {
            if (isShownNetworks && window.innerWidth <= 1024) {
                setIsShowNetworks(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isShownNetworks]);

    const handleShowNetworks = function () {
        setIsShowNetworks((prev) => !prev);
    };

    const handleChooseNetwork = function (network: string) {
        setCurrentNetwork(network);
    };
    return (
        <div className={cx("wrapper", classNames?.classNameWrapper)}>
            <div
                className={cx(
                    "network-selector",
                    {
                        active: isShownNetworks,
                    },
                    classNames?.classNameNetworkList,
                )}
                onClick={handleShowNetworks}
            >
                <span className={cx("current-network")}>{currentNetwork}</span>
                <span className={cx("arrow-icon", classNames?.classNameArrow)}>
                    <Image src={icons.networkSelector} alt="arrow" />
                </span>
                <div
                    className={cx("cover_list-wrapper", {
                        show: isShownNetworks,
                    })}
                >
                    <ul className={cx("cover_list")}>
                        {networks.map(({ networkName }: Network, index: number) =>
                            networkName === currentNetwork ? null : (
                                <li key={index} className={cx("network")} onClick={() => handleChooseNetwork(networkName)}>
                                    {networkName}
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NetworkSelector;
