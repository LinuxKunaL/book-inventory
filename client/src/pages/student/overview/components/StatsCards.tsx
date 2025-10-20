import { useContext } from "react";
import { FiTarget } from "react-icons/fi";
import { IoMdTrophy } from "react-icons/io";
import { MdAccessTime, MdCheckCircle, MdTrendingUp } from "react-icons/md";
import { OverviewStates } from "../context";
import { secondsToHours } from "@utils/format/secondsToHours";

function StatsCards() {
  const { data } = useContext(OverviewStates);
  if (!data.gridOverview) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div className="shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Courses Completed
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.gridOverview.courses.completed}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <MdTrendingUp className="w-3 h-3 mr-1" />
              completed
            </p>
          </div>
          <div className="size-10 sm:size-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <MdCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Study Hours
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {secondsToHours(data.gridOverview.courses.totalHours)}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
              <MdAccessTime className="w-3 h-3 mr-1" />
              hours studied
            </p>
          </div>
          <div className="size-10 sm:size-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <MdAccessTime className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Achievements
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.gridOverview.achievements}
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center mt-1">
              <IoMdTrophy className="w-3 h-3 mr-1" />
              badges earned
            </p>
          </div>
          <div className="size-10 sm:size-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <IoMdTrophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Overall Progress
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.gridOverview.overallProgress}%
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1">
              <FiTarget className="w-3 h-3 mr-1" />
              quiz and course
            </p>
          </div>
          <div className="size-10 sm:size-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <FiTarget className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
