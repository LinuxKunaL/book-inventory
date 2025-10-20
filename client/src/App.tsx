import { Toaster } from "sonner";
import { useEffect } from "react";
import "./functions/toast/toast.css";
import { Provider } from "react-redux";
import reduxStore from "./store/reduxStore";
import { RouterProvider } from "react-router";
import useDarkMode from "@hooks/useDarkMode";
import MainRoutes from "@routes/Main.routes";
import AppTheme from "@components/app/AppTheme";
import useWindowSize from "@hooks/useWindowSize";
import TopLoadingBar from "@components/others/TopLoadingBar";

function App() {
  const { initTheme } = useDarkMode();
  const { isMobile } = useWindowSize();
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <Provider store={reduxStore}>
      <Toaster
        closeButton={true}
        position={isMobile ? "bottom-center" : "top-right"}
      />
      <AppTheme>
        <TopLoadingBar />
        <AppWithRouter />
      </AppTheme>
    </Provider>
  );
}

function AppWithRouter() {
  const router = MainRoutes();

  return <RouterProvider router={router} />;
}

export default App;
