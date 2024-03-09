import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Expand.module.scss";

type Props = {
    className?: string;
    data?: any;
};

const cx = classNames.bind(styles);

const Expand = function ({ className }: Props) {
    const [toggle, setToggle] = useState<boolean>(false);

    const handleActiveAccordion = () => {
        setToggle((prev) => !prev);
    };

    return (
        <div className={cx("wrapper")} onClick={handleActiveAccordion}>
            <header className={cx("header", className)}>
                <span>Mint</span>
                1,243 DJED
                <div
                    className={cx("icon", {
                        active: toggle,
                    })}
                />
            </header>
            <div
                className={cx("expanded-content", {
                    active: toggle,
                })}
            >
                <div className={cx("left-content")}>
                    <div className={cx("date")}>
                        <div className={cx("title-wrapper")}>
                            <span>Date</span>
                        </div>
                        <div className={cx("value")}>09 Mar, 2024 10:59</div>
                    </div>
                    <div className={cx("tx-hash")}>
                        <div className={cx("title-wrapper")}>
                            <span>Tx hash</span>
                        </div>
                        <div className={cx("value")}>
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://preprod.cardanoscan.io/transaction/2e86372a9a062ec900cb8e0b4f0efc40f172d031c1a1844bee5010f53363a891"
                                className="link"
                            >
                                2e86....a891
                            </a>
                        </div>
                    </div>
                </div>
                <div className={cx("right-content")}>
                    <div className={cx("received-or-payed")}>
                        <div className={cx("title-wrapper")}>
                            <span>Received / Payed</span>
                        </div>
                        <div className={cx("value")}>139.78 ₳</div>
                    </div>
                    <div className={cx("status")}>
                        <div className={"title-wrapper"}>
                            <span>Status</span>
                        </div>
                        <div className={cx("value")}>Completed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expand;
