import { useContext, useEffect } from "react";
import Navigation from "./components/Navigation";
import AsideMenu from "./components/AsideMenu";
import { Outlet, useLoaderData } from "react-router";
import BaseLayout from "@components/layouts/BaseLayout";
import SocketLoader from "@components/app/SocketLoader";
import StudentMeProvider, { StudentMeStates } from "./context";
import { NavigationSetter } from "@components/app/NavigationSetter";

function layout() {
  return (
    <BaseLayout className="bg-gray-50">
      <SocketLoader />
      <StudentMeProvider>
        <Content />
      </StudentMeProvider>
      <NavigationSetter />
    </BaseLayout>
  );
}

function Content() {
  const { setStudent } = useContext(StudentMeStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setStudent(loaderResult);
  }, [loaderResult]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex flex-1">
        <AsideMenu />
        <main className="p-3 sm:p-6 lg:ml-64 flex-1 overflow-hidden scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default layout;
