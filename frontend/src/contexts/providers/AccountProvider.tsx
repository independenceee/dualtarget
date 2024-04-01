"use client";

import React, { ReactNode } from "react";
import AccountContext from "~/contexts/components/AccountContext";

type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    return <AccountContext.Provider value={{}}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
