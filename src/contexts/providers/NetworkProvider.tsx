"use client";

import React, { ReactNode } from "react";
import NetworkContext from "~/contexts/components/NetworkContext";

type Props = {
    children: ReactNode;
};

const NetworkProvider = function ({ children }: Props) {
    return <NetworkContext.Provider value={{}}>{children}</NetworkContext.Provider>;
};

export default NetworkProvider;
