import { Controller } from "react-hook-form";
import { type SelectProps } from "../Select";
import { Fragment } from "react/jsx-runtime";
import Select from "../Select";

type Props = SelectProps & {
  errors?: any;
  control: any;
  name: string;
  errorMessage?: string;
  isRequired?: boolean;
  onOpenChange?: (value: boolean) => void;
};

/**
 * react-hook-form Controlled Select
 * @param {Props} props
 * @returns {JSX.Element}
 * */
const SelectControlled = ({
  name,
  control,
  errors,
  options,
  isRequired,
  placeholder,
  errorMessage,
  onOpenChange,
  onChange,
  className,
}: Props) => {
  return (
    <Fragment>
      <Controller
        rules={{ required: isRequired }}
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            onChange={(value) => {
              if (value === "-1") return;
              field.onChange(value);
              if (onChange) onChange(value);
            }}
            BgColor="bg-gray-800"
            className={className}
            placeholder={placeholder}
            onOpenChange={onOpenChange}
          />
        )}
      />
      {errors && errors[name] && (
        <p className="text-red-500 text-sm italic">{errorMessage}</p>
      )}
    </Fragment>
  );
};

export default SelectControlled;
