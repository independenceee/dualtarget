"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Expand.module.scss";

type Props = {};

const cx = classNames.bind(styles);

const Expand = function ({}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("icon")}></div>
            <header className={cx("header")}>
                <span>Mint</span>
                1,243 DJED
            </header>
        </div>
    );
};

export default Expand;
