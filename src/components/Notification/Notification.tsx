import React from "react";
import classNames from "classnames/bind";
import styles from "./Notification.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

const Notification = function () {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("icon-container")}>
                    <Image src={icons.checked} alt="" className={cx("icon")} />
                </div>
                <span className={cx("message")}>Wallet connected</span>
                <div className={cx("icon-delete")}>
                    <Image src={icons.delete} className={cx("icon-delete-image")} alt="" />
                </div>
            </div>
        </main>
    );
};

export default Notification;
