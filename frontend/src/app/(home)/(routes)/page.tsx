"use client";

import React, { useContext, useEffect, useState } from "react";
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
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { UTxO } from "lucid-cardano";
import { StatisticsType } from "~/types/GenericsType";

const cx = classNames.bind(styles);

export default function Home() {
    const { t } = useContext<TranslateContextType>(TranslateContext);
    const { lucidPlatform } = useContext<LucidContextType>(LucidContext);

    const [pool, setPool] = useState<StatisticsType>({
        totalWallet: 0,
        totalUTxO: 0,
        totalADA: 0,
        totalDJED: 0,
    });

    const [profitMargin, setProfitMargin] = useState();

    useEffect(() => {
        if (lucidPlatform) {
            (async function () {
                const contractAddress: string = process.env.DUALTARGET_CONTRACT_ADDRESS_PREPROD! as string;
                const scriptUTxOs: UTxO[] = await lucidPlatform.utxosAt(contractAddress);
                console.log(scriptUTxOs);
                const totalADA: number = scriptUTxOs.reduce(function (balance: number, utxo: UTxO) {
                    return balance + Number(utxo.assets.lovelace) / 1000000;
                }, 0);
                setPool(function (prev) {
                    return {
                        ...prev,
                        totalUTxO: scriptUTxOs.length,
                        totalADA: totalADA,
                    };
                });
            })();
        }
    }, [lucidPlatform]);
    console.log(pool);

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
                            Dualtarget for ADA-Holders (Staking and increasing assets) with a decentralized automated trading bot
                        </div>
                        {/* <div className={cx("description-child")}>DJED is backed by ADA and uses SHEN as a reserve coin.</div> */}
                    </div>
                </div>
            </section>
            <section className={cx("stats")}>
                <div className={cx("stats-inner")}>
                    <div className={cx("stats")}>
                        <Card title="Pool" icon={images.logo} className={cx("stat-djed-stablecoin")}>
                            <Coin buyPrice={1.7199} mintableAmount={2521208.26} sellPrice={1.669} circulatingSupply={3574361.04} />
                            <Button className={cx("stat-button")} href={routes.deposit}>
                                Deposit
                            </Button>
                        </Card>
                        <Card title="Profit margin" icon={images.logo} className={cx("stat-djed-stablecoin")}>
                            <Coin buyPrice={1.7199} mintableAmount={2521208.26} sellPrice={1.669} circulatingSupply={3574361.04} />
                            <Button className={cx("stat-button")} href={routes.withdraw}>
                                Withdraw
                            </Button>
                        </Card>
                    </div>
                    <div className={cx("sub-stats")}>*Deposit\Withdraw includes base fee and operator fee</div>
                </div>
            </section>
            <section className={cx("reverse-wrapper")}>
                <div className={cx("reverse-inner")}>
                    <Gutter className={cx("reverse-card")}>
                        <div>
                            <Title icon={icons.reserves} title="Profit margin" />

                            <div className={cx("reserves")}>
                                <div className={cx("reserve-ratio")}>
                                    <div className={cx("title-wrapper")}>
                                        <h2>ROS</h2>
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

            <section className={cx("about")}>
                <div className={cx("stats-inner")}>
                    <div className={cx("about-inner")}>
                        <div className={cx("video-iframe-wrapper")}>
                            <iframe
                                className={cx("video-iframe")}
                                src="https://www.youtube.com/embed/DCWY93O_QAU"
                                title="Daultarget - Mục Tiêu Kép"
                                frameBorder={"none"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                        <div className={cx("about-content-wrapper")}>
                            <h2 className={cx("about-title")}>About dualtarget</h2>
                            <p className={cx("about-description")}>Staking and increasing assets with a decentralized</p>
                            <span className={cx("about-content")}>
                                We will develop a platform that enables users to choose dual targets and trading methods directly within their
                                wallets. Simultaneously, we'll create automated trading bots on decentralized exchanges
                            </span>
                            <span className={cx("about-content")}>
                                We will develop a platform that enables users to choose dual targets and trading methods directly within their
                                wallets. Simultaneously, we'll create automated trading bots on decentralized exchanges
                            </span>
                            <Button className={cx("stat-button")} href={routes.withdraw}>
                                Contact us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
