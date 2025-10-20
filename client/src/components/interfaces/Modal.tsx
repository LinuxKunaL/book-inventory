import { Dialog } from "@radix-ui/themes";
import clsx from "clsx";

type Props = {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  size?: "1" | "2" | "3" | "4";
};

function Modal({ children, open, className, size }: Props) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Content
        size={size || "4"}
        className={clsx(
          "dark:!bg-gray-900 !border-[0.5px] !border-gray-200 dark:!border-gray-700 !shadow-none scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500 overflow-hidden",
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default Modal;
