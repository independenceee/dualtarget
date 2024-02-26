"use client";

import React from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import TippyWrapper from "./TippyWrapper";
import { Placement } from "tippy.js";
import classNames from "classnames/bind";
import styles from "./Tippy.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode;
    render: React.ReactNode;
    placement?: Placement;
    interactive?: boolean;
};

const Tippy = function ({ children, render, placement = "top-start", interactive = true }: Props) {
    return (
        <HeadlessTippy
            placement={placement}
            interactive={interactive}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                    <TippyWrapper>{render}</TippyWrapper>
                </div>
            )}
        >
            <div className={cx("children")}>{children}</div>
        </HeadlessTippy>
    );
};

export default Tippy;
