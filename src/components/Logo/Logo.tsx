import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./Logo.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);

type Props = {
    width?: number;
    height?: number;
    className?: string;
};

const Logo = function ({ width, height, className }: Props) {
    return (
        <div className={cx("wrapper")}>
            <Image width={width} height={height} src={images.logo} alt="dual-target" className={className} />
        </div>
    );
};

export default Logo;
