"use client";

import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import images from "~/assets/images";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import Gutter from "~/components/Card/Gutter";
import Title from "~/components/Card/Title";
import routes from "~/configs/routes";
import Coin from "~/components/Card/Coin";
import { TranslateContextType } from "~/types/contexts/TranslateContextType";
import TranslateContext from "~/contexts/components/TranslateContext";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

export default function Home() {
    const { t } = useContext<TranslateContextType>(TranslateContext);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("background-gallaxy-wrapper")}>
                <Image src={images.galaxy} alt="background-gallaxy" className={cx("home-background-image")} />
            </div>
            <div className={cx("background-cardano-side-wrapper")}>
                <Image src={images.cardanoSide} alt="cardano-side" className={cx("cardano-side-background-image")} />
            </div>
            <div className={cx("background-floating-coins-wrapper")}>
                <Image src={images.djedHeaderCoins} alt="djed-coins" className={cx("djed-coins-background-image")} />
            </div>
            <div className={cx("background-floating-coins-mobile-wrapper")}>
                <Image src={images.djedHeaderCoinsMobile} alt="djed-coins" className={cx("djed-coins-mobile-background-image")} />
            </div>
            <section className={cx("content")}>
                <div className={cx("introduction")}>
                    <div className={cx("introduction-header")}>
                        <span className={cx("prefix")}>Dualtarget</span>
                        <span className={cx("title")}>{t("home")}</span>
                    </div>
                    <div className={cx("introduction-description")}>
                        <div className={cx("description-child")}>
                            Cardano&apos;s native overcollateralized stablecoin, developed by IOG and powered by COTI.
                        </div>
                        <div className={cx("description-child")}>DJED is backed by ADA and uses SHEN as a reserve coin.</div>
                    </div>
                </div>
            </section>
            <section className={cx("stats")}>
                <div className={cx("stats-inner")}>
                    <div className={cx("stats")}>
                        <Card title="Deposit Stablecoin" icon={images.logo} className={cx("stat-djed-stablecoin")}>
                            <Coin buyPrice={1.7199} mintableAmount={2521208.26} sellPrice={1.669} circulatingSupply={3574361.04} />
                            <Button className={cx("stat-button")} href={routes.deposit}>
                                Deposit
                            </Button>
                        </Card>
                        <Card title="Withdraw Stablecoin" icon={images.logo} className={cx("stat-djed-stablecoin")}>
                            <Coin buyPrice={1.7199} mintableAmount={2521208.26} sellPrice={1.669} circulatingSupply={3574361.04} />
                            <Button className={cx("stat-button")} href={routes.withdraw}>
                                Withdraw
                            </Button>
                        </Card>
                    </div>
                    <div className={cx("sub-stats")}>*Buy\Sell price includes base fee, and does not include operator fee</div>
                </div>
            </section>
            <section className={cx("reverse-wrapper")}>
                <div className={cx("reverse-inner")}>
                    <Gutter className={cx("reverse-card")}>
                        <div>
                            <Title icon={icons.reserves} title="Reserve" />

                            <div className={cx("reserves")}>
                                <div className={cx("reserve-ratio")}>
                                    <div className={cx("title-wrapper")}>
                                        <h2>Ratio</h2>
                                    </div>
                                    <div className={cx("reserves-value-ratio")}>
                                        615<span className="suffix">%</span>
                                    </div>
                                </div>
                                <div className={cx("base-reserves")}>
                                    <div className={cx("title-wrapper")}>
                                        <h2>Base Reserve</h2>
                                    </div>
                                    <div className={cx("reserves-value-base")}>
                                        <div className={cx("base-reserves-value")}>37,107,970.3052 ₳</div>
                                        <span className={cx("approximate")}>≈21,987,529.98 DJED</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("last-updated-mobile")}>Last updated: 22 Feb, 2024 17:06 UTC</div>
                        </div>
                    </Gutter>
                </div>
            </section>
        </div>
    );
}
