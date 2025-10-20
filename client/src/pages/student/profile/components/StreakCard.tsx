import { StudentMeStates } from "@pages/student/context";
import { useContext } from "react";

function StreakCard() {
  const { student } = useContext(StudentMeStates);
  return (
    <div className=" shadow-sm p-4 sm:p-6 bg-gradient-to-r from-crimson-50 to-blue-50 dark:from-crimson-900/20 dark:to-blue-900/20 border border-crimson-200 dark:border-crimson-700/50 rounded-xl">
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
        Learning Streak
      </h3>
      <div className="text-center">
        <div className="text-3xl font-bold text-crimson-600 dark:text-crimson-400 mb-1">
          {student.streak}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          days in a row
        </p>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Keep it up! You're doing great.
        </p>
      </div>
    </div>
  );
}

export default StreakCard;
