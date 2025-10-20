import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import CreateOrder from "./CreateOrder";

function Header() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Orders Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage all Orders
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="soft"
          size="3"
          radius="medium"
        >
          <MdAdd /> Create Order
        </Button>
      </div>
      {isAddModalOpen && <CreateOrder close={setIsAddModalOpen}/>}
    </div>
  );
}

export default Header;
