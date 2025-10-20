import { useContext, useEffect } from "react";
import QuizzesList from "./components/QuizzesList";
import Filter from "./components/Filter";
import Header from "./components/Header";
import { useLoaderData } from "react-router";
import QuizzesBrowseProvider, { QuizzesBrowseStates } from "./context";

function layout() {
  return (
    <QuizzesBrowseProvider>
      <Content />
    </QuizzesBrowseProvider>
  );
}

function Content() {
  const { setData } = useContext(QuizzesBrowseStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <Header />
      <Filter />
      <QuizzesList />
    </div>
  );
}

export default layout;
