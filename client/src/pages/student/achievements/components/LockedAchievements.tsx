import { useContext } from "react";
import { AchievementsStates } from "../context";
import { FiTarget } from "react-icons/fi";

function LockedAchievements() {
  const { data } = useContext(AchievementsStates);

  if (!data.look) {
    return null;
  }

  return (
    <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <FiTarget className="text-gray-600 dark:text-gray-400" size={24} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Locked Achievements
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.look.length} achievements to unlock
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {data.look.map((achievement) => (
          <div className="flex items-center gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 opacity-75">
            <div className="text-xl sm:text-3xl grayscale">
              {achievement.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {achievement.title}
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                {achievement.description}
              </p>
            </div>
            <div className="size-9 sm:size-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <FiTarget className="text-gray-400" size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LockedAchievements;
