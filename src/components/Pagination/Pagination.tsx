"use client";

import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import icons from "~/assets/icons";
import Button from "~/components/Button";
import styles from "./Pagination.module.scss";

type Props = {};

const cx = classNames.bind(styles);

const Pagination = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <Button className={cx("button")}>
                <Image className={cx("image")} src={icons.arrowLeftPagination} alt="" />
                <Image className={cx("image")} src={icons.arrowLeftPagination} alt="" />
                <span className={cx("button-text")}>First</span>
            </Button>
            <Button className={cx("button")}>
                <Image className={cx("image")} src={icons.arrowLeftPagination} alt="" />
                <span className={cx("button-text")}>Previous</span>
            </Button>
            <span className={cx("buttons-list")}></span>
            <span className={cx("page-of-total")}>{"1" + "-" + "5" + " of " + "7" + " Orders"}</span>
            <Button className={cx("button")}>
                <span className={cx("button-text")}>Next</span>
                <Image className={cx("image")} src={icons.arrowRightPagination} alt="" />
            </Button>
            <Button className={cx("button")}>
                <span className={cx("button-text")}>Last</span>
                <Image className={cx("image")} src={icons.arrowRightPagination} alt="" />
                <Image className={cx("image")} src={icons.arrowRightPagination} alt="" />
            </Button>
        </div>
    );
};

export default Pagination;
