import clsx from "clsx";
import Logo from "@assets/Logo";
import { useContext, useEffect, useRef, useState } from "react";
import boy from "@assets/boy.svg";
import girl from "@assets/girl.svg";
import { useSelector } from "react-redux";
import useDarkMode from "@hooks/useDarkMode";
import { Button, IconButton } from "@radix-ui/themes";
import { StudentMeStates } from "../context";
import { RiMenuFill } from "react-icons/ri";
import type { RootState } from "src/store/reduxStore";
import { IoMdLogOut, IoMdMoon, IoMdSunny } from "react-icons/io";
import { MdArrowDropDown, MdNotifications, MdPerson } from "react-icons/md";
import { Link } from "react-router";
import useStudentAuth from "@hooks/api/auth/useStudent.auth";
import ActionModal from "@components/interfaces/ActionModal";

function Navigation() {
  const notification = useSelector(
    (state: RootState) => state.notificationSlice
  );
  const [isDropdownInfo, setIsDropdownInfo] = useState(false);
  const { toggle, currentTheme } = useDarkMode();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLogoutDialog, setIsLogoutDialog] = useState(false);
  const { logout } = useStudentAuth();
  const { student, isSideMenu, setIsSideMenu } = useContext(StudentMeStates);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenAside = () => {
    setIsSideMenu(!isSideMenu);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-1 sm:px-4 sm:py-3">
        <div className="flex items-center gap-4 justify-center">
          <Logo />
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
            className="!ml-4 lg:!flex"
          >
            {currentTheme == "light" ? (
              <IoMdMoon size={20} color="gray" />
            ) : (
              <IoMdSunny size={20} color="gray" />
            )}
          </IconButton>
          <IconButton
            color="gray"
            variant="soft"
            size={"2"}
            className="!relative"
          >
            <MdNotifications size={20} />
            {notification.count > 0 && (
              <span className="text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                {notification.count}
              </span>
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
                  src={student.gender == "male" ? boy : girl}
                />
              </span>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {student.studentName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Student
                </p>
              </div>
              <MdArrowDropDown size={20} color="gray" />
            </button>
            {isDropdownInfo && (
              <div className="absolute right-0 top-full mt-2 border-[1px] border-gray-700 rounded-lg bg-white dark:bg-gray-800 w-auto border-t-crimson-600 border-t-2">
                <div>
                  <div className="flex items-center gap-3 p-3">
                    <div className="size-8 sm:size-13 border-4 border-white/20 shadow-lg rounded-full">
                      <img
                        className="aspect-square h-full w-full"
                        alt="Profile"
                        src={student.gender == "male" ? boy : girl}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white text-nowrap">
                        {student.studentName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-nowrap">
                        admission No: {student.admissionNumber}
                      </p>
                    </div>
                  </div>
                  <div className="border-t-1 border-t-gray-700 p-4 w-full flex flex-col gap-3">
                    <Link to="/dashboard/profile">
                      <Button
                        className="!w-full !text-left"
                        variant="ghost"
                        radius="medium"
                      >
                        <MdPerson size={20} />
                        <span className="w-full text-left p-1">Profile</span>
                      </Button>
                    </Link>
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
      </div>
    </header>
  );
}

export default Navigation;
