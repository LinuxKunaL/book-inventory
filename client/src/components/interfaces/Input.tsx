import { TextField } from "@radix-ui/themes";
import clsx from "clsx";
import type { ComponentType } from "react";

export type InputFieldsProps = TextField.RootProps & {
  icon?: ComponentType<{ height?: number; width?: number }>;
  secondIconButton?: React.ReactNode;
  BgColor?: string;
  className?: string;
  height?: number|string;
};

function Input({
  icon: Icon,
  secondIconButton,
  BgColor,
  className,
  height,
  ...props
}: InputFieldsProps) {
  return (
    <TextField.Root
      {...props}
      className={clsx(BgColor && "dark:!" + BgColor, className, "!h-"+height)}
    >
      {Icon && (
        <TextField.Slot>
          <Icon height={16} width={16} />
        </TextField.Slot>
      )}
      {secondIconButton && <TextField.Slot>{secondIconButton}</TextField.Slot>}
    </TextField.Root>
  );
}

export default Input;
