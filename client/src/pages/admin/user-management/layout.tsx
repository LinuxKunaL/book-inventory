import { useContext, useEffect } from "react";
import Filter from "./components/Filter";
import Header from "./components/Header";
import UsersList from "./components/UsersList";
import StudentProvider, { UserStates } from "./context";
import UserAdd from "./components/UserAdd";
import { useLoaderData } from "react-router";
import { userData } from "@data/demo";

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
    setData({ totalUser: 10, users: userData });
  }, [loaderResult]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <Header />
      <Filter />
      <UsersList />
      {isAddModalOpen.isOpen && <UserAdd />}
    </div>
  );
}

export default layout;
