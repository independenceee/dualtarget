"use client";

import React, { ReactNode, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const WalletProvider = lazy(() => import("~/contexts/providers/WalletProvider"));
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("~/contexts/providers/ModalProvider"));
const NetworkProvider = lazy(() => import("~/contexts/providers/NetworkProvider"));
const TranslateProvider = lazy(() => import("~/contexts/providers/TranslateProvider"));
const AccountProvider = lazy(() => import("~/contexts/providers/AccountProvider"));
const SmartContractProvider = lazy(() => import("~/contexts/providers/SmartContractProvider"));
const TransactionProvider = lazy(() => import("~/contexts/providers/TransactionProvider"));

type Props = {
    children: ReactNode;
};

const queryClient = new QueryClient();

const ContextProvider = function ({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <TranslateProvider>
                <ModalProvider>
                    <NetworkProvider>
                        <LucidProvider>
                            <WalletProvider>
                                <AccountProvider>
                                    <SmartContractProvider>
                                        <TransactionProvider>{children}</TransactionProvider>
                                    </SmartContractProvider>
                                </AccountProvider>
                            </WalletProvider>
                        </LucidProvider>
                    </NetworkProvider>
                </ModalProvider>
            </TranslateProvider>
        </QueryClientProvider>
    );
};

export default ContextProvider;
