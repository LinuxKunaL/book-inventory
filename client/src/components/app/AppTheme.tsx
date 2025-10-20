import useWindowSize from "@hooks/useWindowSize";
import { Theme } from "@radix-ui/themes";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function AppTheme({ children }: Props) {
  const { isMobile } = useWindowSize();

  return (
    <Theme
      accentColor="orange"
      grayColor="sand"
      radius="full"
      scaling={isMobile ? "90%" : "100%"}
      className="flex flex-col"
    >
      {children}
    </Theme>
  );
}

export default AppTheme;
