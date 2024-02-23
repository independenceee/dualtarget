import React from "react";
import classNames from "classnames/bind";
import { FaRegQuestionCircle } from "react-icons/fa";
import styles from "./Notification.module.scss";

const cx = classNames.bind(styles);
type Props = {};

const Notification = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <span className={cx("icon-wrapper")}>
                <FaRegQuestionCircle className={cx("icon")} />
            </span>
            <span className={cx("label")}>Help</span>
        </div>
    );
};

export default Notification;
