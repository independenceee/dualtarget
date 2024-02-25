"use client";

import React, { ReactNode } from "react";
import ModalContext from "~/contexts/components/ModalContext";

type Props = {
    children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
    return <ModalContext.Provider value={{}}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
