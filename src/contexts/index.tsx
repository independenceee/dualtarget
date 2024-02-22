"use client";

import React, { ReactNode, lazy } from "react";

const WalletProvider = lazy(() => import("~/contexts/providers/WalletProvider"));
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <WalletProvider>{children}</WalletProvider>
        </LucidProvider>
    );
};

export default ContextProvider;
