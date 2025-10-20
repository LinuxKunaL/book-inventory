import { useContext, useEffect } from "react";
import CoursesList from "./components/CoursesList";
import Filter from "./components/Filter";
import Header from "./components/Header";
import CoursesBrowseProvider, { CoursesBrowseStates } from "./context";
import { useLoaderData } from "react-router";

function layout() {
  return (
    <CoursesBrowseProvider>
      <Content />
    </CoursesBrowseProvider>
  );
}

function Content() {
  const { setData } = useContext(CoursesBrowseStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <Header />
      <Filter />
      <CoursesList />
    </div>
  );
}

export default layout;
