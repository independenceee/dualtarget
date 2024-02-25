import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import Button from "../Button";
import Gutter from "./Gutter";
import Title from "./Title";
import { ButtonProps } from "../Button/Button";
import { omit } from "lodash";

const cx = classNames.bind(styles);

type Props = {
    icon: string | StaticImport;
    title: string;
    className?: string;
    buttonOptions?: ButtonProps;
    children: React.ReactNode;
};

const Card = function ({ icon, title, className, buttonOptions, children }: Props) {
    return (
        <Gutter className={className}>
            <Title icon={icon} title={title} />
            {children}
            <div>
                <Button {...omit(buttonOptions, ["children"])} className={cx("button")}>
                    {buttonOptions?.children}
                </Button>
            </div>
        </Gutter>
    );
};

export default Card;
