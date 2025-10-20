import { Controller } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import Editor from "../Editor";
import { getNestedError } from "@utils/getNestedError";

type Props = {
  errors: any;
  control: any;
  name: string;
  errorMessage: string;
};

/**
 * react-hook-form Controlled Select
 * @param {Props} props
 * @returns {JSX.Element}
 * */
const EditorControlled = ({ name, control, errors, errorMessage }: Props) => {
  const error = getNestedError(errors, name);

  return (
    <Fragment>
      <Controller
        rules={{ required: true }}
        control={control}
        name={name}
        render={({ field }) => (
          <Editor content={field.value} setContent={field.onChange} />
        )}
      />
      {error && <p className="text-red-500 text-sm italic">{errorMessage}</p>}
    </Fragment>
  );
};

export default EditorControlled;
