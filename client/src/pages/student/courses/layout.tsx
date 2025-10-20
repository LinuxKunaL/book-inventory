import { useContext, useEffect } from "react";
import Courses from "./components/CoursesList";
import Header from "./components/Header";
import ProgressOverview from "./components/ProgressOverview";
import CoursesProvider, { CoursesStates } from "./context";
import { useLoaderData } from "react-router";

function layout() {
  return (
    <CoursesProvider>
      <Content />
    </CoursesProvider>
  );
}

const Content = () => {
  const { setData } = useContext(CoursesStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  return (
    <div className="space-y-6 flex flex-col h-full pb-4">
      <Header />
      <ProgressOverview />
      <Courses />
    </div>
  );
};

export default layout;
