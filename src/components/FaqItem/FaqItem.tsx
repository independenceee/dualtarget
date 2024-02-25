import React from "react";
import classNames from "classnames/bind";
import styles from "./FaqItem.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const FaqItem = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <section className={cx("icon")} />
                <section className={cx("title-wrapper")}>
                    <h3 className={cx("title")}>What is DJED's stability mechanism?</h3>
                </section>
            </div>
        </div>
    );
};

export default FaqItem;
