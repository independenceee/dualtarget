import classNames from "classnames/bind";
import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    register: UseFormRegister<any>;
    title?: string;
    errorMessage?: string;
    rules?: RegisterOptions;
}

const Input = function ({ name, register, type = "text", rules, errorMessage, title, placeholder, className }: Props) {
    return (
        <section className={cx("input-field", className)}>
            <div>{title}</div>
            <div className={cx("input-wrapper")}>
                <input type={type} {...register(name, rules)} placeholder={placeholder} className={cx("input", classNames)} />
            </div>
            <span className={cx("error-message")}>{errorMessage}</span>
        </section>
    );
};

export default Input;
