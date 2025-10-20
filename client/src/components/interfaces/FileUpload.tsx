import clsx from "clsx";
import React, { Fragment, useState } from "react";

type FileUploadProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  name: string;
  accept?: string;
};

const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : "");
    if (file) {
      if (props.onChange) {
        props.onChange(e);
      }
    }
  };

  return (
    <Fragment>
      <div
        className={clsx(
          "flex items-center bg-white dark:bg-gray-800 rounded-md w-full border-gray-400/60 dark:border-gray-700 border-[1.1px] active:border-crimson-600 transition-colors duration-200 overflow-hidden",
          props.className
        )}
      >
        <label className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-3 sm:px-4 font-base cursor-pointer text-nowrap hover:dark:bg-gray-600 hover:bg-gray-200 transition-colors sm:text-base p-[5px] sm:p-[7px]">
          Choose File
          <input
            name={props.name}
            type="file"
            onChange={handleFileChange}
            accept={props.accept}
            className="hidden"
          />
        </label>
        <span
          id={props.name + "-span"}
          className="ml-4 dark:text-gray-300 text-gray-700 text-sm truncate"
          title={fileName}
        >
          {fileName || "No file selected"}
        </span>
      </div>
    </Fragment>
  );
};

export default FileUpload;
