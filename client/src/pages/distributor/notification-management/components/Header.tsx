import { Button } from "@radix-ui/themes";
import { MdAdd } from "react-icons/md";
import SendNotification from "./SendNotification";
import { useState } from "react";

function Header() {
  const [isVisibleSendNotification, setIsVisibleSendNotification] =
    useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Notifications Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Send announcements and manage communication with students
        </p>
      </div>
      <Button
        onClick={() => setIsVisibleSendNotification(true)}
        variant="soft"
        size="3"
        radius="medium"
      >
        <MdAdd /> Send Notification
      </Button>
      {isVisibleSendNotification && (
        <SendNotification setOpen={setIsVisibleSendNotification} />
      )}
    </div>
  );
}

export default Header;
