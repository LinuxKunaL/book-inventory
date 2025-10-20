import clsx from "clsx";
import { useContext } from "react";
import { Button } from "@radix-ui/themes";
import { AdminStates } from "../context";
import { PiExamBold } from "react-icons/pi";
import { BiBox, BiSolidBox, BiSolidSchool } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router";
import { MdBook, MdHome, MdPerson, MdNotifications, MdLocationPin, MdOutbox } from "react-icons/md";

function AsideMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isSideMenu, setIsSideMenu } = useContext(AdminStates);
  const navigationItems = [
    {
      label: "Users",
      href: "/admin",
      icon: MdHome,
      isActive: pathname === "/admin",
    },
    {
      label: "Books",
      href: "/admin/books",
      icon: MdBook,
      isActive: pathname.includes("/admin/books"),
    },
    {
      label: "Orders",
      href: "/admin/orders?page=1",
      icon: BiSolidBox,
      isActive: pathname.includes("/admin/order"),
    },
    // {
    //   label: "Locations",
    //   href: "/admin/locations?page=1",
    //   icon: MdLocationPin,
    //   isActive: pathname.includes("/admin/locations"),
    // },
    // {
    //   label: "Notifications",
    //   href: "/admin/notifications?page=1",
    //   icon: MdNotifications,
    //   isActive: pathname.includes("/admin/notifications"),
    // }
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
