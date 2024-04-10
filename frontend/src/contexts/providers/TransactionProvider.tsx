"use client";

import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, useContext, useState } from "react";
import TransactionContext from "~/contexts/components/TransactionContext";
import { TransactionType } from "~/types/GenericsType";
import { AccountContextType } from "~/types/contexts/AccountContextType";
import { get } from "~/utils/http-requests";
import AccountContext from "../components/AccountContext";

type Props = {
    children: ReactNode;
};

const TransactionProvider = function ({ children }: Props) {
    

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                setTransactions,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export default TransactionProvider;
