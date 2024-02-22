"use client";

import React, { ReactNode, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./PublicLayout.module.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);

const PublicLayout = function ({ children }: Props) {
    return (
        <main className={cx("wrapper")}>
            <Header />
            <div>{children}</div>
            <Footer />
        </main>
    );
};

export default PublicLayout;
