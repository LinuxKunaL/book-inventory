import { useContext, useEffect } from "react";
import Filter from "./components/Filter";
import Header from "./components/Header";
import BooksList from "./components/BooksList";
import StudentProvider, { UserStates } from "./context";
import BookAdd from "./components/BookAdd";
import { useLoaderData } from "react-router";
import { bookData } from "@data/demo";

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
    setData({ totalBooks: 10, books: bookData });
  }, [loaderResult]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <Header />
      <Filter />
      <BooksList />
      {isAddModalOpen.isOpen && <BookAdd />}
    </div>
  );
}

export default layout;
