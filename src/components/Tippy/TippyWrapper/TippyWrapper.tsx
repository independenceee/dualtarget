import classNames from "classnames/bind";
import React from "react";
import styles from "./TippyWrapper.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode;
};

const TippyWrapper = function ({ children }: Props) {
    return <div className={cx("wrapper")}>{children}</div>;
};

export default TippyWrapper;
