import React, { ReactNode } from "react";
import type { Metadata } from "next";
import ContextProvider from "~/contexts";
import { PublicLayout } from "~/layouts";
import NetworkConnectionStatus from "~/components/NetworkConnectionStatus";
import "./globals.scss";
import historyPrice from "~/utils/history-price";

export const metadata: Metadata = {
    title: "Dual Target - Home",
    description: "Dual Target",
};

type Props = {
    children: ReactNode;
};

const RootLayout =  function ({ children }: Readonly<Props>) {
    
    return (
        <html lang="en">
            <body>
                <ContextProvider>
                    <PublicLayout>{children}</PublicLayout>
                    <NetworkConnectionStatus />
                </ContextProvider>
            </body>
        </html>
    );
};

export default RootLayout;
