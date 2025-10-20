import { Button } from "@radix-ui/themes";
import { useContext } from "react";
import { MdAdd } from "react-icons/md";
import {  UserStates } from "../context";

function Header() {
  const { setIsAddModalOpen } = useContext(UserStates);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          User Management

        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage user accounts
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={() =>
            setIsAddModalOpen(({ isOpen, editData }) => ({
              isOpen: !isOpen,
              editData,
            }))
          }
          variant="soft"
          size="3"
          radius="medium"
        >
          <MdAdd /> Add User
        </Button>
      </div>
    </div>
  );
}

export default Header;
