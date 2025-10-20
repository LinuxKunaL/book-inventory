import { getNestedError } from "@utils/getNestedError";
import clsx from "clsx";
import React, { Fragment } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";

type FileUploadProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errors: FieldErrors;
  name: string;
  control: Control<any>;
  errorMessage?: string;
  isRequired?: boolean;
  accept?: string;
};

const FileUploadControlled: React.FC<FileUploadProps> = (
  props: FileUploadProps
) => {
  const error = getNestedError(props.errors, props.name);

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: any
  ) => {
    props.onChange?.(event);
    const file = event.target.files?.[0] || null;
    if (file) {
      fieldOnChange(file);
    } else {
      fieldOnChange(null);
    }
  };

  return (
    <Fragment>
      <Controller
        name={props.name}
        control={props.control}
        rules={{
          required: props.isRequired
            ? props.errorMessage || "This field is required"
            : false,
        }}
        render={({ field: { onChange, value } }) => (
          <div
            className={clsx(
              "flex items-center bg-white dark:bg-gray-800 rounded-md w-full border-gray-400/60 dark:border-gray-700 border-[1.1px] active:border-crimson-600 transition-colors duration-200 overflow-hidden",
              props.className
            )}
          >
            <label className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-3 sm:px-4  cursor-pointer text-nowrap hover:dark:bg-gray-600 hover:bg-gray-200 transition-colors sm:text-base p-[5px] sm:p-[7px]">
              Choose File
              <input
                type="file"
                accept={props.accept}
                className="hidden"
                onChange={(event) => handleChange(event, onChange)}
              />
            </label>
            <span className="ml-4 dark:text-gray-300 text-gray-700 text-sm truncate">
              {value instanceof File ? value.name : value || "No file selected"}
            </span>
          </div>
        )}
      />
      {error && (
        <p className="text-red-500 text-sm italic">
          {error?.message as string}
        </p>
      )}
    </Fragment>
  );
};

export default FileUploadControlled;
