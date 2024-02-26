"use client";

import React, { ReactNode, lazy } from "react";

const WalletProvider = lazy(() => import("~/contexts/providers/WalletProvider"));
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("~/contexts/providers/ModalProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <ModalProvider>
            <LucidProvider>
                <WalletProvider>{children}</WalletProvider>
            </LucidProvider>
        </ModalProvider>
    );
};

export default ContextProvider;
