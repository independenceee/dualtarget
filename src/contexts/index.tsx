"use client";

import React, { ReactNode, lazy } from "react";

const SmartContractProvider = lazy(() => import("~/contexts/providers/SmartContractProvider"));
const WalletProvider = lazy(() => import("~/contexts/providers/WalletProvider"));
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("~/contexts/providers/ModalProvider"));
const NetworkProvider = lazy(() => import("~/contexts/providers/NetworkProvider"));
const TranslateProvider = lazy(() => import("~/contexts/providers/TranslateProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <TranslateProvider>
            <ModalProvider>
                <NetworkProvider>
                    <LucidProvider>
                        <WalletProvider>
                            <SmartContractProvider>{children}</SmartContractProvider>
                        </WalletProvider>
                    </LucidProvider>
                </NetworkProvider>
            </ModalProvider>
        </TranslateProvider>
    );
};

export default ContextProvider;
