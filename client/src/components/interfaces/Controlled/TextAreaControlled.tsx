import { Fragment } from "react";
import  { type InputFieldsProps } from "../Input";
import type { UseFormRegister } from "react-hook-form";
import { TextArea } from "@radix-ui/themes";

type Props = InputFieldsProps & {
  errors: any;
  name: string;
  register: UseFormRegister<any>;
  errorMessage?: string;
  placeholder?: string;
  isRequired?: boolean;
  patternValidation?: {
    value: RegExp;
    message: string;
  };
};

function TextAreaControlled(props: Props) {
  return (
    <Fragment>
      <TextArea
        size="3"
        className="dark:!bg-gray-800"
        placeholder={props.placeholder || ""}
        {...props.register(props.name, {
          required: props.isRequired ? props.errorMessage : false,
          pattern: props.patternValidation,
        })}
      />
      {props.errors[props.name] && (
        <p className="text-red-500 text-sm italic">
          {props.errors[props.name].message}
        </p>
      )}
    </Fragment>
  );
}

export default TextAreaControlled;
