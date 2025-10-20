import clsx from "clsx";
import { useContext, useState } from "react";
import { Button } from "@radix-ui/themes";
import { useLocation, useNavigate } from "react-router";
import { MdBook, MdHome, MdNotifications, MdPerson } from "react-icons/md";
import { PiExamBold } from "react-icons/pi";
import { GiAchievement } from "react-icons/gi";
import { useSelector } from "react-redux";
import type { RootState } from "src/store/reduxStore";
import { StudentMeStates } from "../context";

function AsideMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const notification = useSelector(
    (state: RootState) => state.notificationSlice
  );
  const { isSideMenu, setIsSideMenu } = useContext(StudentMeStates);

  const navigationItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: MdHome,
      isActive: pathname === "/dashboard",
    },
    {
      label: "Courses",
      href: "/dashboard/courses",
      icon: MdBook,
      isActive: pathname.startsWith("/dashboard/courses"),
    },
    {
      label: "Quizzes",
      href: "/dashboard/quizzes",
      icon: PiExamBold,
      isActive: pathname === "/dashboard/quizzes",
    },
    {
      label: "Notifications",
      href: "/dashboard/notifications",
      icon: MdNotifications,
      isActive: pathname === "/dashboard/notifications",
      badge: notification?.count || "",
    },
    {
      label: "Achievements",
      href: "/dashboard/achievements",
      icon: GiAchievement,
      isActive: pathname === "/dashboard/achievements",
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: MdPerson,
      isActive: pathname === "/dashboard/profile",
    },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    if (isSideMenu === true) {
      setIsSideMenu(false);
    }
  };

  return (
    <aside
      className={clsx(
        "fixed top-14 flex-shrink-0 sm:top-19 inset-y-0 left-0 z-40 w-64 max-h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out",
        isSideMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full pt-6">
        <nav className="flex-1 px-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200",
                  item.isActive
                    ? "bg-crimson-50 dark:bg-crimson-900/30 text-crimson-600 dark:text-crimson-400 border-r-2 border-crimson-500 dark:border-crimson-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-crimson-50 to-blue-50 dark:from-crimson-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-crimson-200 dark:border-crimson-700/50">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
              Need Help?
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Get support from our team
            </p>
            <Button
              size="2"
              radius="medium"
              variant="solid"
              className="!w-full"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AsideMenu;
