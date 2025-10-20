import type { IconType } from "react-icons/lib";
import { HiDotsHorizontal } from "react-icons/hi";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { baseMenuItemPropDefs } from "@radix-ui/themes/components/_internal/base-menu.props";

export type DropdownMenuProps = {
  options: {
    label: string;
    color?: (typeof baseMenuItemPropDefs.color.values)[number];
    icon?: IconType;
    onClick?: (data?: any) => void;
  }[];
};

function DropdownMenuView({ options }: DropdownMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost">
          <HiDotsHorizontal />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="dark:!bg-gray-800 !shadow-none border-[1px] border-gray-200 dark:border-gray-700">
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <DropdownMenu.Item
              key={index}
              color={option.color}
              onClick={option.onClick}
            >
              {Icon && <Icon />}
              {option.label}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default DropdownMenuView;
