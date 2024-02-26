import classNames from "classnames/bind";
import React from "react";
<<<<<<< Updated upstream
import Coin from "~/components/Card/Coin";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders";
import styles from "./Shen.module.scss";
=======
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Orders from "~/components/Orders/Orders";
import styles from "./Shen.module.scss";
import Service from "~/components/Card/Service";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                            <Card
                                title="Djed Stablecoin"
                                icon={icons.djed}
                                className={cx("stat-djed-stablecoin")}
                                buttonOptions={{
                                    children: "Mint",
                                    disabled: true,
                                }}
                            >
                                <Coin buyPrice={1.7199} mintableAmount={2521208.26} sellPrice={1.669} circulatingSupply={3574361.04} />
                            </Card>
                            <Card
                                title="Djed Stablecoin"
                                icon={icons.djed}
                                className={cx("stat-djed-stablecoin")}
                                buttonOptions={{
                                    children: "Burn",
                                    disabled: true,
                                }}
                            >
                                <Coin buyPrice={1.7199} mintableAmount={2521208.26} sellPrice={1.669} circulatingSupply={3574361.04} />
                            </Card>
=======
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
                                    <Service type="pay" />
                                </Card>
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
                                    <Service type="get" />
                                </Card>
                            </div>
>>>>>>> Stashed changes
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
