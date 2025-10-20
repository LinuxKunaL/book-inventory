import Welcome from "./components/Welcome";
import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router";
import StatCards from "./components/StatsCards";
import LatestQuizzes from "./components/LatestQuizzes";
import OverviewProvider, { OverviewStates } from "./context";
import LearningAndAchievements from "./components/LearningAndAchievements";

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
      <Welcome />
      <StatCards />
      <LearningAndAchievements />
      <LatestQuizzes />
    </div>
  );
}

export default layout;
