import classNames from "classnames/bind";
import React from "react";
import styles from "./DelegationRewards.module.scss";
const cx = classNames.bind(styles);

const DelegationRewards = function () {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("inner")}>
                    <h1 className={cx("title")}>Delegation Rewards for $SHEN holders</h1>
                    <h2 className={cx("sub-title")}>Check your ADA rewards</h2>
                    <form className={cx("form")}>
                        <section className={cx("label")}>
                            <h1>Address</h1>
                            <div className={cx("tooltip")}></div>
                        </section>
                        <section className={cx("search")}>
                            <div className={cx("search-input")}>
                                <input type="text" placeholder="Enter address to load the data" />
                            </div>
                            <div className={cx("search-delete")} />
                        </section>
                    </form>

                    <section className={cx("summary")}>
                        
                    </section>
                    
                    <section className={cx("status")}>
                        <div className={cx("no-data")} />
                        <span>No data for this address</span>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DelegationRewards;
