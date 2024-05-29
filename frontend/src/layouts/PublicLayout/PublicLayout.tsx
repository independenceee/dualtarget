"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./PublicLayout.module.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Notification from "../components/Notification";
import { usePathname } from "next/navigation";
import Loading from "~/app/(loading)/loading";
type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);

const PublicLayout = function ({ children }: Props) {
    const pathName = usePathname();
    const [selectedRouter, setSelectedRouter] = useState<string>("");
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    useEffect(() => {
        setSelectedRouter(pathName || "/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPageLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <main className={cx("wrapper")}>
            <div>
                <Header selectedRouter={selectedRouter} setSelectedRouter={setSelectedRouter} />
                {children}
                <Footer />
            </div>
            <Notification />

            {pageLoading && <Loading />}
        </main>
    );
};

export default PublicLayout;
