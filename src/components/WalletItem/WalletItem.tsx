"use client";

import React, { useEffect, useState } from "react";
import styles from "./WalletItem.module.scss";
import classNames from "classnames/bind";
import { WalletType } from "~/types/GenericsType";
import Image from "next/image";
import Link from "next/link";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

type Props = {
    wallet: WalletType;
};

const WalletItem = function ({ wallet }: Props) {
    const [isDownload, setIsDownload] = useState<boolean>(true);

    useEffect(() => {
        (async function () {
            setIsDownload(await wallet.checkApi());
        })();
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("icon-wrapper")}>
                <Image className={cx("icon-image")} src={wallet.image} alt={wallet.name} />
            </div>
            <div className={cx("container")}>
                <div className={cx("name")}>{wallet.name}</div>
                {!isDownload && (
                    <div className={cx("action")}>
                        <Link className={cx("action-link")} href={wallet.downloadApi as string} target="_blank">
                            Not installed
                            <Image className={cx("action-image")} src={icons.install} alt="install icons" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletItem;
