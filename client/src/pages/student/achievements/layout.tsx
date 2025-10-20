import Header from "./components/Header";
import { useLoaderData } from "react-router";
import { useContext, useEffect } from "react";
import Achievements from "./components/Achievements";
import LockedAchievements from "./components/LockedAchievements";
import AchievementsProvider, { AchievementsStates } from "./context";

function layout() {
  return (
    <AchievementsProvider>
      <Content />
    </AchievementsProvider>
  );
}

function Content() {
  const { setData } = useContext(AchievementsStates);
  const loaderResult = useLoaderData();


  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  return (
    <div className="space-y-6">
      <Header />
      <Achievements />
      <LockedAchievements />
    </div>
  );
}

export default layout;
