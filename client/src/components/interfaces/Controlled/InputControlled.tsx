import { Fragment } from "react";
import Input, { type InputFieldsProps } from "../Input";
import type { UseFormRegister } from "react-hook-form";
import { getNestedError } from "@utils/getNestedError";

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

function InputControlled(props: Props) {
  const error = getNestedError(props.errors, props.name);

  return (
    <Fragment>
      <Input
        size="3"
        {...props}
        radius="medium"
        variant="surface"
        BgColor="bg-gray-800"
        placeholder={props.placeholder || ""}
        {...props.register(props.name, {
          required: props.isRequired ? props.errorMessage : false,
          pattern: props.patternValidation,
        })}
      />
      {error && <p className="text-red-500 text-sm italic">{error.message}</p>}
    </Fragment>
  );
}

export default InputControlled;
