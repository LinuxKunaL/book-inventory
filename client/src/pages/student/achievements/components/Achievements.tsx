import { useContext } from "react";
import { BiTrophy } from "react-icons/bi";
import { AchievementsStates } from "../context";
import { IconButton } from "@radix-ui/themes";
import { MdCalendarMonth, MdCheck } from "react-icons/md";

function Achievements() {
  const { data } = useContext(AchievementsStates);

  if (!data.unlock) {
    return null;
  }

  return (
    <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 bg-crimson-100 dark:bg-crimson-900/30 rounded-lg flex items-center justify-center">
          <BiTrophy className="text-crimson-600 dark:text-crimson-400" size={24} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Unlocked Achievements
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.unlock.length} achievements earned
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {data.unlock.map(({ achievement, unlockDate }) => (
          <div className="flex items-center gap-4 p-2 sm:p-4 bg-gradient-to-r from-crimson-50 to-blue-50 dark:from-crimson-900/20 dark:to-blue-900/20 rounded-lg border border-crimson-200 dark:border-crimson-800">
            <div className="text-xl sm:text-3xl">{achievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {achievement.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">
                {achievement.description}
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <MdCalendarMonth size={16} />
                <span>Unlocked on {new Date(unlockDate).toDateString()}</span>
              </div>
            </div>
            <IconButton variant="soft" color="green">
              <MdCheck size={20} />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
