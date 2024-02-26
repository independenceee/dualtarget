"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./FaqItem.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const FaqItem = function ({}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = function () {
        setIsOpen(!isOpen);
    };
    return (
        <div className={cx("wrapper", { isOpen: isOpen })} onClick={handleOpen}>
            <header className={cx("inner")}>
                <section className={cx("icon", { isOpen: isOpen })} />
                <section className={cx("title-wrapper")}>
                    <h3 className={cx("title")}>What is DJED s stability mechanism?</h3>
                </section>
                {isOpen && <section className={cx("container")}></section>}
            </header>
        </div>
    );
};

export default FaqItem;
