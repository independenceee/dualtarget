"use client";

import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import icons from "~/assets/icons";
import Button from "~/components/Button";
import styles from "./Pagination.module.scss";

const cx = classNames.bind(styles);

type Props = {
    page?: number;
    pageSize: number;
    totalItems: number;
    className?: string;
};

const Pagination = function ({ page = 1, pageSize, totalItems, className }: Props) {
    const totalPages = totalItems / pageSize;
    return (
        <div className={cx("wrapper", className)}>
            <Button className={cx("button")} disabled={page === 1}>
                <Image className={cx("image")} src={icons.arrowLeftPagination} alt="" />
                <Image className={cx("image")} src={icons.arrowLeftPagination} alt="" />
                <span className={cx("button-text")}>First</span>
            </Button>
            <Button className={cx("button")} disabled={page === 1}>
                <Image className={cx("image")} src={icons.arrowLeftPagination} alt="" />
                <span className={cx("button-text")}>Previous</span>
            </Button>
            <span className={cx("page-of-total")}>{page + "-" + totalPages + " of " + totalItems + " Orders"}</span>
            <Button className={cx("button")} disabled={page === totalPages}>
                <span className={cx("button-text")}>Next</span>
                <Image className={cx("image")} src={icons.arrowRightPagination} alt="" />
            </Button>
            <Button className={cx("button")} disabled={page === totalPages}>
                <span className={cx("button-text")}>Last</span>
                <Image className={cx("image")} src={icons.arrowRightPagination} alt="" />
                <Image className={cx("image")} src={icons.arrowRightPagination} alt="" />
            </Button>
        </div>
    );
};

export default Pagination;
