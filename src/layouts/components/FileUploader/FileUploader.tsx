import classNames from "classnames/bind";
import React, { useRef, useState } from "react";
import styles from "./FileUploader.module.scss";

const cx = classNames.bind(styles);

const FileUploader = function () {
    const [files, setFiles] = useState([]);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleOpenFileDialog = function () {
        inputFileRef.current?.click();
    };

    const handleUploadFiles = function (e: React.ChangeEvent<HTMLInputElement>) {};

    return (
        <div className={cx("wrapper")}>
            <label htmlFor="dropzone-input" className={cx("label")}>
                Attachments {files.length > 0 && files.length}
            </label>

            <button type="button" aria-label="Attachments" className={cx("upload-file")} onClick={handleOpenFileDialog}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    focusable="false"
                    viewBox="0 0 16 16"
                    className="styles__Icon-sc-11ubl44-3 fqoZnQ"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        d="M9.5 4v7.7c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V3C6.5 1.6 7.6.5 9 .5s2.5 1.1 2.5 2.5v9c0 1.9-1.6 3.5-3.5 3.5S4.5 13.9 4.5 12V4"
                    />
                </svg>
                <div className={cx("button-title")}>Add up to 5 files</div>
            </button>
            <input type="file" id="dropzone-input" multiple hidden ref={inputFileRef} onChange={handleUploadFiles} />
        </div>
    );
};

export default FileUploader;
