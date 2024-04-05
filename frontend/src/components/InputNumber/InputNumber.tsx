import classNames from "classnames/bind";
import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import styles from "./InputNumber.module.scss";
const cx = classNames.bind(styles);

interface Props {
    placeholder?: string;
    title?: string;
    errorMessage?: string;
    className?: string;
    onChange?: (...event: any[]) => void;
    value: string;
}
const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
    { errorMessage, title, placeholder, className, onChange, value = "" }: Props,
    ref,
) {
    const [localValue, setLocalValue] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if ((/^\d+$/.test(value) || value === "") && onChange) {
            onChange(e);
            setLocalValue(value);
        }
    };
    
    return (
        <section className={cx("input-field", className)}>
            <div className={cx("title")}>{title}</div>
            <div className={cx("input-wrapper")}>
                <input ref={ref} value={value || localValue} onChange={handleChange} placeholder={placeholder} className={cx("input", classNames)} />
            </div>
            <span className={cx("error-message")}>{errorMessage}</span>
        </section>
    );
});

export default InputNumber;
