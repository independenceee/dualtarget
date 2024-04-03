"use client";

import React, { createContext } from "react";
import { CoinmarketContextType } from "~/types/contexts/CoinmarketContextType";

const CoinmarketContext = createContext<CoinmarketContextType>(null!);

export default CoinmarketContext;
