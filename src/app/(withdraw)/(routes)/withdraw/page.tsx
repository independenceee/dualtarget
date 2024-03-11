import classNames from "classnames/bind";
import React from "react";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders/Orders";
import styles from "./Withdraw.module.scss";
import Service from "~/components/Card/Service";
import Image from "next/image";
import images from "~/assets/images";
const cx = classNames.bind(styles);

const Shen = function () {
    return (
        <div className={cx("wrapper")}>
            <section className={cx("header-wrapper")}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>Mint or Burn DJED</h2>
                </div>
                <div className={cx("stats")}>
                    <div className={cx("stats-inner")}>
                        <div className={cx("stats")}>
                            <div className={cx("card-wrapper")}>
                                <Card
                                    title="Mint DJED"
                                    icon={icons.djed}
                                    className={cx("stat-djed-stablecoin")}
                                    buttonOptions={{
                                        children: "Mint",
                                        disabled: true,
                                    }}
                                >
                                    <Service type="PAY" />
                                </Card>
                                <Image className={cx("coin-image-left")} src={images.coinDjedLeft} alt="coin-djed" />
                            </div>
                            <div className={cx("card-wrapper")}>
                                <Card
                                    title="Burn DJED"
                                    icon={icons.djed}
                                    className={cx("stat-djed-stablecoin")}
                                    buttonOptions={{
                                        children: "Burn",
                                        disabled: true,
                                    }}
                                >
                                    <Service type="GET" />
                                </Card>
                                <Image className={cx("coin-image-right")} src={images.coinDjedRight} alt="coin-djed" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={cx("header-order")}>
                    <h2 className={cx("title")}>Orders</h2>
                </div>
                <Orders className={cx("orders")} />
            </section>
        </div>
    );
};

export default Shen;
