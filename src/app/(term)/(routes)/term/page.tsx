import React from "react";
import classNames from "classnames/bind";
import styles from "./Term.module.scss";

const cx = classNames.bind(styles);
type Props = {};

const Term = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div>
                <h1 className={cx("title")}>TERMS OF USE</h1>
            </div>
        </div>
    );
};

export default Term;
