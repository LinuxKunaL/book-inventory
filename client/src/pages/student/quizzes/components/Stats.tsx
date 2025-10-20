import { Progress } from "@radix-ui/themes";
import { useContext } from "react";
import { BiBookOpen } from "react-icons/bi";
import { MdCheck, MdPersonOutline } from "react-icons/md";
import { QuizzesStates } from "../context";
import useWindowSize from "@hooks/useWindowSize";

function Stats() {
  const { data } = useContext(QuizzesStates);
  const { isMobile } = useWindowSize();

  if (!data.stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div className="rounded-lg border  shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Quizzes
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.totalQuizzes}
              </p>
            </div>
            <div className="sm:size-12 size-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <BiBookOpen
                className="text-blue-600 dark:text-blue-400"
                size={isMobile ? 19 : 24}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border  shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completed
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.stats.attempted}
              </p>
            </div>
            <div className="sm:size-12 size-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <MdCheck
                className="text-green-600 dark:text-green-400"
                size={isMobile ? 19 : 24}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border  shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Score
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.stats.averageScore}%
              </p>
            </div>
            <div className="sm:size-12 size-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <MdPersonOutline
                className="text-purple-600 dark:text-purple-400"
                size={isMobile ? 19 : 24}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border  shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Passed
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.stats.passed}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {(data.stats.passed || 0 / data.totalQuizzes || 0) * 100}% pass
                rate
              </p>
            </div>
            <div className="sm:size-12 size-10 bg-crimson-100 dark:bg-crimson-900 rounded-lg flex items-center justify-center">
              <MdCheck
                className="text-crimson-600 dark:text-crimson-400"
                size={isMobile ? 19 : 24}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
