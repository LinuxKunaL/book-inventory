import ActionModal from "@components/interfaces/ActionModal";
import useStudentAuth from "@hooks/api/auth/useStudent.auth";
import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { FiUser } from "react-icons/fi";

function AccountSetting() {
  const [isLogoutDialog, setIsLogoutDialog] = useState(false);
  const { logout } = useStudentAuth();

  return (
    <div className=" shadow-sm sm:p-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        Account Settings
      </h3>
      <div className="flex flex-col gap-4">
        <Button
          className="!w-full"
          size={"3"}
          color="red"
          radius="medium"
          variant="ghost"
          onClick={() => setIsLogoutDialog(true)}
        >
          <FiUser size={16} />
          logout account
        </Button>
      </div>
      {isLogoutDialog && (
        <ActionModal
          title="Logout"
          yesText="Logout"
          yesColor="red"
          no={() => setIsLogoutDialog(false)}
          yes={logout}
          description="Are you sure you want to logout ?"
        />
      )}
    </div>
  );
}

export default AccountSetting;
