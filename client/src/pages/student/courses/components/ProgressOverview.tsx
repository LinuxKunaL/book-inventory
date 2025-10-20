import { BiBookOpen } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { CoursesStates } from "../context";
import { useContext } from "react";
import { secondsToHours } from "@utils/format/secondsToHours";

function ProgressOverview() {
  const { data } = useContext(CoursesStates);

  if (!data.stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <div className=" shadow-sm p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Completed Courses
            </p>
            <p className="text-xl sm:text-2xl font-bold text-green-900 dark:text-green-300">
              {data.stats.completed}
            </p>
          </div>
          <MdCheck className="text-green-600 dark:text-green-400 size-6 sm:size-8" />
        </div>
      </div>
      <div className=" shadow-sm p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-crimson-50 dark:from-blue-900/20 dark:to-crimson-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
              In Progress
            </p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-300">
              {data.stats.inProgress}
            </p>
          </div>
          <BiBookOpen className="text-blue-600 dark:text-blue-400 size-6 sm:size-8" />
        </div>
      </div>
      <div className=" shadow-sm p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700/50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
              Total Hours
            </p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-300">
              {secondsToHours(data.stats.totalHours)}
            </p>
          </div>
          <FaRegClock className="text-purple-600 dark:text-purple-400 size-6 sm:size-8" />
        </div>
      </div>
    </div>
  );
}

export default ProgressOverview;
