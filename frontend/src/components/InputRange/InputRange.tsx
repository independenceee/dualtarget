import React from "react";
import Image from "next/image";
import Tippy from "../Tippy";
import classNames from "classnames/bind";
import styles from "./InputRange.module.scss";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

const InputRange = function () {
    return (
        <div className={cx("amount-slider-container")}>
            <div className={cx("percentage")}>
                <div className={cx("percentage_min_max")}>
                    <p className="disabled">MIN</p>
                    <Tippy render={<div>Calculated based on the contract minimum amount parameters.</div>}>
                        <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                    </Tippy>
                </div>
                <div className={cx("percentage_min_max")}>
                    <p className="disabled">MAX</p>
                    <Tippy placement="top-end" render={<div>Calculate based on the available mintable amount and your wallet balance.</div>}>
                        <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                    </Tippy>
                </div>
            </div>
            <div className={cx("slider-input-group")}>
                <input className={cx("slider-input")} type="range" min={0} max={1} step="0.01" defaultValue={0} />{" "}
                <div className={cx("cover_lines")}>
                    <div className={cx("vertical-line")}>
                        <Image src={icons.separate} alt="separate" />
                    </div>
                    <div className={cx("vertical-line")}>
                        <Image src={icons.separate} alt="separate" />
                    </div>
                    <div className={cx("vertical-line")}>
                        <Image src={icons.separate} alt="separate" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputRange;
