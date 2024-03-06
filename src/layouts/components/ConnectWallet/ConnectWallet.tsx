"use client";

import React, { ChangeEvent, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import Modal from "~/components/Modal";
import { useModal } from "~/hooks";
import icons from "~/assets/icons";
import configs from "~/configs";
import styles from "./ConnectWallet.module.scss";
import wallets from "~/constants/wallets";
import { WalletType } from "~/types/GenericsType";
import WalletItem from "~/components/WalletItem";
import Button from "~/components/Button";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import convertString from "~/helpers/convert-string";
import Notification from "~/components/Notification";

const cx = classNames.bind(styles);
type Props = {
    className?: string;
};

const ConnectWallet = function ({ className }: Props) {
    const { isShowing: isShowingWallet, toggle: toggleShowingWallet } = useModal();
    const { isShowing: isShowingConnectError, toggle: toggleShowingConnectError } = useModal();
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);

    const [accept, setAccept] = useState<boolean>(false);

    const handleAccept = function (event: ChangeEvent<HTMLInputElement>) {
        setAccept(event.target.checked);
    };

    return (
        <div className={cx("wrapper", className)}>
            <Button onClick={toggleShowingWallet} className={cx("connect-wallet-button")}>
                {lucid ? (
                    <div>
                        <section className={cx("connected-wallet-container")}>
                            <div className={cx("connected-wallet-total-ada")}>
                                {wallet?.balance} {" ₳"}
                            </div>

                            <div className={cx("connected-wallet-image-container")}>
                                <Image className={cx("connected-wallet-image")} src={wallet?.image} alt="image-connected" />
                            </div>
                            <div className={cx("connected-wallet-address")}>
                                {convertString({ inputString: String(wallet?.address), numberOfFirstChar: 7, numberOfLastChar: -6 })}
                            </div>
                            <div className={cx("connected-wallet-icon-container")}>
                                <Image className={cx("connected-wallet-icon")} src={icons.arrowBottom} alt="" />
                            </div>
                        </section>

                        <section className={cx("wallet-open")}>
                            <div className={cx("top-wallet")}>
                                <div className={cx("icon-wallet")}>
                                    <Image className={cx("icon-wallet-image")} src={wallet?.image} alt="" />
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <span>Connect Wallet</span>
                )}
            </Button>

            {/* <Notification /> */}

            {!lucid && (
                <Modal isShowing={isShowingWallet} toggle={toggleShowingWallet}>
                    <div className={cx("connect-wallet-wrapper")}>
                        <section onClick={toggleShowingWallet} className={cx("connect-wallet-close")}>
                            <Image className={cx("connect-wallet-close-icon")} src={icons.close} alt="" />
                        </section>
                        <section className={cx("connect-wallet-title")}>
                            <h1>Connect Wallet</h1>
                        </section>
                        <section className={cx("connect-wallet-accept")}>
                            <div className={cx("connect-wallet-input")}>
                                <input onChange={handleAccept} type="checkbox" placeholder="" className={cx("connect-wallet-checkbox")} />
                            </div>
                            <label className={cx("connect-wallet-input")} htmlFor="">
                                By checking this box and connecting my wallet, I confirm that I have read, understood, and agreed to the
                                <Link className={cx("connect-wallet-input-link")} target="_blank" href={configs.routes.term}>
                                    Terms and Conditions
                                </Link>
                                .
                            </label>
                        </section>
                        <section className={cx("connect-wallet-container")}>
                            {wallets.map(function (wallet: WalletType, index: number) {
                                return <WalletItem wallet={wallet} key={index} accept={accept} />;
                            })}
                        </section>
                    </div>
                </Modal>
            )}

            <Modal toggle={toggleShowingConnectError} isShowing={isShowingConnectError}>
                <div className={cx("connect-wallet-error-wrapper")}>
                    <h2 className={cx("connect-wallet-error-title")}>Wallet Network Error</h2>
                    <p className={cx("connect-wallet-error-description")}>Please change the network to preprod or disconnect</p>
                    <div className={cx("connect-wallet-error-button-wrapper")}>
                        <Button className={cx("connect-wallet-error-button")}>Disconnect</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ConnectWallet;
