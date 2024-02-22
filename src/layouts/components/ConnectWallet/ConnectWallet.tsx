import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import Modal from "~/components/Modal";
import { useModal } from "~/hooks";
import icons from "~/assets/icons";
import Link from "next/link";
import configs from "~/configs";
import styles from "./ConnectWallet.module.scss";
import wallets from "~/constants/wallets";

const cx = classNames.bind(styles);
type Props = {};

const ConnectWallet = function ({}: Props) {
    const { isShowing, toggle } = useModal();
    return (
        <div className={cx("wrapper")}>
            <button onClick={toggle} className={cx("connect-wallet-button")}>
                Connect Wallet
            </button>

            <Modal isShowing={isShowing} toggle={toggle}>
                <div className={cx("connect-wallet-wrapper")}>
                    <section onClick={toggle} className={cx("connect-wallet-close")}>
                        <Image className={cx("connect-wallet-close-icon")} src={icons.close} alt="" />
                    </section>
                    <section className={cx("connect-wallet-title")}>
                        <h1>Connect Wallet</h1>
                    </section>
                    <section className={cx("connect-wallet-accept")}>
                        <div className={cx("connect-wallet-input")}>
                            <input type="checkbox" placeholder="" className={cx("connect-wallet-checkbox")} />
                        </div>
                        <label className={cx("connect-wallet-input")} htmlFor="">
                            By checking this box and connecting my wallet, I confirm that I have read, understood, and agreed to the
                            <Link target="_blank" href={configs.routes.term}>
                                Terms and Conditions
                            </Link>
                        </label>
                    </section>
                    <section className={cx("connect-wallet-container")}>
                        
                    </section>
                </div>
            </Modal>
        </div>
    );
};

export default ConnectWallet;
