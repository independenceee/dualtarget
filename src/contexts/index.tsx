import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return <>{children}</>;
};

export default ContextProvider;
