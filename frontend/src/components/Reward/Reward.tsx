import React from "react";
import classNames from "classnames/bind";
import styles from "./Reward.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import { DelegationRewardType } from "~/types/GenericsType";

const cx = classNames.bind(styles);

type Props = {
    classNames?: string;
    data: DelegationRewardType;
};

const Reward = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("icon")} />
            </div>
        </div>
    );
};

export default Reward;
