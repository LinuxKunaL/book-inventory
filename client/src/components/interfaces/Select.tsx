import { Select as SelectView } from "@radix-ui/themes";
import clsx from "clsx";

export type SelectProps = {
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  BgColor?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  height?: string | number;
  onChange?: (value: string | undefined) => void;
  onOpenChange?: (value: boolean) => void;
};

function Select(props: SelectProps) {

  return (
    <SelectView.Root
      size="3"
      value={props.value ?? ""}
      onValueChange={(value) => {
        if (value) {
          props.onChange?.(value);
        }
      }}
      onOpenChange={props.onOpenChange}
    >
      <SelectView.Trigger
        variant="surface"
        radius="medium"
        className={clsx(
          "w-full",
          props.BgColor && "dark:!" + props.BgColor,
          props.height && "!h-" + props.height,
          props.className
        )}
        placeholder={props.placeholder}
      />
      <SelectView.Content
        position="popper"
        className="dark:!bg-gray-800/60 backdrop-blur !rounded-md border-[1px] border-gray-400/50 !shadow-none"
      >
        {props.options.map((option) => (
          <SelectView.Item key={option.value} value={option.value}>
            {option.label}
          </SelectView.Item>
        ))}
      </SelectView.Content>
    </SelectView.Root>
  );
}

export default Select;
