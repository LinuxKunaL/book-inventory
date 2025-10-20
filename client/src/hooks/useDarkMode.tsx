import { useState } from "react";

const useDarkMode = () => {
  const [currentTheme, setCurrentTheme] = useState("");

  const initTheme = () => {
    const theme = localStorage.getItem("theme");

    if (!theme) {
      localStorage.setItem("theme", "light");
      setCurrentTheme("light");
      return;
    }
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.toggle(theme ? theme : "light");
  };

  const setTheme = (theme: string) => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  };

  const toggle = () => {
    const theme = localStorage.getItem("theme");

    const newTheme = theme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return { toggle, initTheme, currentTheme };
};

export default useDarkMode;
