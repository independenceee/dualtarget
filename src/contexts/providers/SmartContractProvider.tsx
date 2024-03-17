"use client";

import React, { ReactNode, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { Network } from "lucid-cardano";
type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    return <SmartContractContext.Provider value={{}}>{children}</SmartContractContext.Provider>;
};

export default SmartContractProvider;
