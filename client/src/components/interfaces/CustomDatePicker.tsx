import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type props = {
  selected: Date;
  onChange: (date: string) => void;
  placeholder: string;
};

export default function CustomDatePicker({
  onChange,
  selected,
  placeholder,
}: props) {
  return (
    <div className="rt-TextFieldRoot rt-r-size-3 rt-variant-surface dark:!bg-gray-800 !rounded-md">
      <DatePicker
        showYearDropdown
        selected={selected}
        dropdownMode="scroll"
        scrollableYearDropdown
        dateFormat="MM/dd/yyyy"
        yearDropdownItemNumber={20}
        wrapperClassName="self-center"
        placeholderText={placeholder}
        className="rt-reset rt-TextFieldInput"
        onChange={(date) => onChange(new Date(date!).toLocaleDateString())}
      />
    </div>
  );
}
