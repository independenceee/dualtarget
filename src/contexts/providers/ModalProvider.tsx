"use client";

import React, { ReactNode } from "react";
import ModalContext from "~/contexts/components/ModalContext";
import { useModal } from "~/hooks";

type Props = {
    children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
    const { isShowing: isShowingWallet, toggle: toggleShowingWallet } = useModal();
    const { isShowing: isShowingErrorNetwork, toggle: toogleErrorNetwork } = useModal();
    return (
        <ModalContext.Provider value={{ isShowingErrorNetwork, toogleErrorNetwork, isShowingWallet, toggleShowingWallet }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
