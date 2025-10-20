import { useContext, useEffect } from "react";
import Header from "./components/Header";
import NotificationView from "./components/NotificationView";
import NotificationProvider from "./context";
import { useLoaderData } from "react-router";
import { NotificationStates } from "./context";

function layout() {
  return (
    <NotificationProvider>
      <Content />
    </NotificationProvider>
  );
}

function Content() {
  const { setData } = useContext(NotificationStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <Header />
      <NotificationView />
    </div>
  );
}

export default layout;
