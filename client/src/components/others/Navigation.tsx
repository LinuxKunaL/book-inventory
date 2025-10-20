import clsx from "clsx";
import Logo from "@assets/Logo";
import { useState } from "react";
import { Link } from "react-router";
import useDarkMode from "@hooks/useDarkMode";
import { Button, IconButton } from "@radix-ui/themes";
import useCheckAuthUi from "@hooks/api/others/useCheckAuthUi";
import { IoMdClose, IoMdMenu, IoMdMoon, IoMdSunny } from "react-icons/io";

function Navigation() {
  const { toggle, currentTheme } = useDarkMode();
  const [openMenu, setOpenMenu] = useState(false);
  const { isAdminLogin, isStudentLogin } = useCheckAuthUi();

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <nav className="w-full justify-center flex sticky top-0 z-50 backdrop-blur-lg border bg-gray-50/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-600/50">
      <div className="flex items-center transition-all duration-100 justify-between container mx-auto md:px-16 px-5 h-16">
        <Logo from="home"/>
        <div
          className={clsx(
            "flex items-center space-x-1 gap-5 lg:flex-row flex-col lg:dark:bg-transparent lg:bg-transparent dark:bg-gray-800 bg-gray-100 lg:p-0 p-5 lg:static absolute top-16 lg:w-auto w-full left-0 lg:border-0 border-b border-gray-200 dark:border-gray-700",
            openMenu ? "block" : "lg:flex hidden"
          )}
        >
          <Link
            to={{ pathname: "/", hash: "#features" }}
            className="lg:w-auto w-full"
          >
            <Button
              variant="ghost"
              radius="full"
              color="gray"
              className="!px-4 !py-2 !font-semibold !lg:w-auto !w-full"
              highContrast
              onClick={toggleMenu}
            >
              Features
            </Button>
          </Link>
          <Link to="/#testimonial" className="lg:w-auto w-full">
            <Button
              variant="ghost"
              radius="full"
              highContrast
              color="gray"
              className="!px-4 !py-2 !font-semibold !lg:w-auto !w-full"  onClick={toggleMenu}
            >
              Testimonial
            </Button>
          </Link>
          <Link to="/contact" className="lg:w-auto w-full">
            <Button
              variant="ghost"
              radius="full"
              highContrast
              color="gray"
              className="!px-4 !py-2 !font-semibold !lg:w-auto !w-full"  onClick={toggleMenu}
            >
              Contact
            </Button>
          </Link>
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
          {!(isAdminLogin || isStudentLogin) && (
            <Link to="auth?action=register-student" className="lg:w-auto w-full">
              <Button
                className="!px-6 !py-4 !lg:w-auto !w-full"
                radius="medium"
              >
                Get Started
              </Button>
            </Link>
          )}
          {isStudentLogin && (
            <Link to="/dashboard" className="lg:w-auto w-full">
              <Button
                className="!px-6 !py-4 !lg:w-auto !w-full"
                radius="medium"
              >
                Dashboard
              </Button>
            </Link>
          )}
          {isAdminLogin && (
            <Link to="/admin" prefetch="intent" className="lg:w-auto w-full">
              <Button
                className="!px-6 !py-4 !lg:w-auto !w-full"
                radius="medium"
              >
                Admin
              </Button>
            </Link>
          )}
        </div>
        <div className="lg:!hidden">
          <IconButton
            aria-label="Toggle theme"
            onClick={toggle}
            color="gray"
            variant="soft"
            radius="medium"
            size={"2"}
            className="!ml-4"
          >
            {currentTheme == "light" ? (
              <IoMdMoon size={20} color="gray" />
            ) : (
              <IoMdSunny size={20} color="gray" />
            )}
          </IconButton>
          <IconButton
            size={"2"}
            color="gray"
            variant="soft"
            radius="medium"
            className="!ml-4"
            onClick={toggleMenu}
            aria-label="Toggle theme"
          >
            {openMenu != true ? (
              <IoMdMenu size={20} color="gray" />
            ) : (
              <IoMdClose size={20} color="gray" />
            )}
          </IconButton>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
