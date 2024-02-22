"use client";

import React, { ReactNode } from "react";
import { Lucid } from "lucid-cardano";
import WalletContext from "~/contexts/components/WalletContext";

type Props = {
    children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
    return <WalletContext.Provider value={{}}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
