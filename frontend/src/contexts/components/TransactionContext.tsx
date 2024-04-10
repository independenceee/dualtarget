"use client";

import React, { createContext } from "react";
import { TransactionContextType } from "~/types/contexts/TransactionContextType";

const TransactionContext = createContext<TransactionContextType>(null!);

export default TransactionContext;
