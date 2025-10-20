import { Controller } from "react-hook-form";
import CustomDatePicker from "../CustomDatePicker";
import { Fragment } from "react/jsx-runtime";

type Props = {
  errors: any;
  control: any;
  name: string;
  errorMessage: string;
  placeholder: string;
  isRequired?: boolean;
};

/**
 * react-hook-form Controlled DatePicker
 * @param {Props} props
 * @returns {JSX.Element}
 * */
const DatePickerControlled = ({
  name,
  control,
  errors,
  isRequired,
  placeholder,
  errorMessage,
}: Props) => {
  return (
    <Fragment>
      <Controller
        rules={{ required: isRequired }}
        control={control}
        name={name}
        render={({ field }) => (
          <CustomDatePicker
            {...field}
            selected={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm italic">{errorMessage}</p>
      )}
    </Fragment>
  );
};

export default DatePickerControlled;
