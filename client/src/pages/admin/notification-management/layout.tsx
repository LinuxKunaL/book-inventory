import { useContext, useEffect } from "react";
import Filter from "./components/Filter";
import Header from "./components/Header";
import NotificationItems from "./components/NotificationItems";
import NotificationProvider, { NotificationStates } from "./context";
import { useLoaderData } from "react-router";

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
      <Filter />
      <NotificationItems />
    </div>
  );
}

export default layout;
