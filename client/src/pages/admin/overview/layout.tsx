import Stats from "./components/Stats";
import Header from "./components/Header";
import { useLoaderData } from "react-router";
import { useContext, useEffect } from "react";
import TopStudents from "./components/TopStudents";
import OverviewProvider, { OverviewStates } from "./context";
import QuizPerformance from "./components/QuizPerformance";

function layout() {
  return (
    <OverviewProvider>
      <Content />
    </OverviewProvider>
  );
}

function Content() {
  const { setData } = useContext(OverviewStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Header />
      <Stats />
      <QuizPerformance />
      <TopStudents />
    </div>
  );
}

export default layout;
