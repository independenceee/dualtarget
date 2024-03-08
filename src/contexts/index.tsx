"use client";

import React, { ReactNode, lazy } from "react";

const WalletProvider = lazy(() => import("~/contexts/providers/WalletProvider"));
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("~/contexts/providers/ModalProvider"));
const NetworkProvider = lazy(() => import("~/contexts/providers/NetworkProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <ModalProvider>
            <NetworkProvider>
                <LucidProvider>
                    <WalletProvider>{children}</WalletProvider>
                </LucidProvider>
            </NetworkProvider>
        </ModalProvider>
    );
};

export default ContextProvider;
