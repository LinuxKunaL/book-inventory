import { locationData, userData } from "@data/demo";
import Filter from "./components/Filter";
import Header from "./components/Header";
import { useLoaderData } from "react-router";
import { useContext, useEffect } from "react";
import LocationAdd from "./components/LocationAdd";
import StudentProvider, { UserStates } from "./context";
import LocationsList from "./components/LocationsList";

function layout() {
  return (
    <StudentProvider>
      <Content />
    </StudentProvider>
  );
}

function Content() {
  const { isAddModalOpen, setData } = useContext(UserStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData({ totalLocation: 10, locations: locationData });
  }, [loaderResult]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <Header />
      <Filter />
      <LocationsList />
      {isAddModalOpen.isOpen && <LocationAdd />}
    </div>
  );
}

export default layout;
