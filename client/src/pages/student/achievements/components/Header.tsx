import { useContext } from "react";
import { AchievementsStates } from "../context";

function Header() {
  const { data } = useContext(AchievementsStates);

  if (!(data.look || data.unlock)) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Achievements
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your learning milestones and celebrate your progress
        </p>
      </div>
      <div className="flex items-center space-x-3 sm:self-start self-end">
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-crimson-500">
            {data.unlock.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Unlocked
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-gray-400">
            {data.look.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Locked</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
