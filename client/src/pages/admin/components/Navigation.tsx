import clsx from "clsx";
import Logo from "@assets/Logo";
import { AdminStates } from "../context";
import { RiMenuFill } from "react-icons/ri";
import useDarkMode from "@hooks/useDarkMode";
import { useContext, useRef, useState } from "react";
import useStudentAuth from "@hooks/api/auth/useStudent.auth";
import ActionModal from "@components/interfaces/ActionModal";
import { Badge, Button, IconButton } from "@radix-ui/themes";
import { IoMdLogOut, IoMdMoon, IoMdSunny } from "react-icons/io";
import { MdArrowDropDown, MdOutlineShield } from "react-icons/md";

function Navigation() {
  const { toggle, currentTheme } = useDarkMode();
  const [isDropdownInfo, setIsDropdownInfo] = useState(false);
  const { isSideMenu, setIsSideMenu } = useContext(AdminStates);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLogoutDialog, setIsLogoutDialog] = useState(false);
  const { logout } = useStudentAuth();

  const handleOpenAside = () => {
    setIsSideMenu(!isSideMenu);
  };
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-1 sm:px-4 sm:py-4">
        <div className="flex items-center gap-4">
          <Logo />
          <Badge variant="soft" size="2">
            <MdOutlineShield size={15} />
            Admin
          </Badge>
          <IconButton
            color="gray"
            variant="ghost"
            size={"3"}
            className={clsx(
              "!relative lg:!hidden",
              isSideMenu && "dark:!bg-gray-700 !bg-gray-100"
            )}
            onClick={handleOpenAside}
          >
            <RiMenuFill size={24} />
            <span className="pl-2">Menu</span>
          </IconButton>
        </div>
        <div className="flex items-center gap-3">
          <IconButton
            aria-label="Toggle theme"
            onClick={toggle}
            color="gray"
            variant="soft"
            size={"2"}
            className="!ml-4 lg:!flex !hidden"
          >
            {currentTheme == "light" ? (
              <IoMdMoon size={20} color="gray" />
            ) : (
              <IoMdSunny size={20} color="gray" />
            )}
          </IconButton>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setIsDropdownInfo(!isDropdownInfo)}
            >
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <img
                  className="aspect-square h-full w-full"
                  alt="Profile"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                />
              </span>
              <div className="hidden sm:block text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Admin
                </p>
              </div>
              <MdArrowDropDown size={20} color="gray" />
            </button>
            {isDropdownInfo && (
              <div className="absolute right-0 top-full mt-2 border-[1px] border-gray-700 rounded-lg bg-white dark:bg-gray-800 w-uto border-t-crimson-600 border-t-2 w-40">
                <div>
                  <div className="flex items-center gap-3 p-3">
                    <div className="size-8 sm:size-13 border-4 border-white/20 shadow-lg rounded-full overflow-hidden">
                      <img
                        className="aspect-square h-full w-full"
                        alt="Profile"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Admin</p>
                    </div>
                  </div>
                  <div className="border-t-1 border-t-gray-700 p-4 w-full flex flex-col gap-3">
                    <Button
                      className="!w-full !text-left"
                      variant="ghost"
                      radius="medium"
                      color="red"
                      onClick={() => setIsLogoutDialog(true)}
                    >
                      <IoMdLogOut size={20} />
                      <span className="w-full text-left p-1">Logout</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
    </header>
  );
}

export default Navigation;
