import { useContext } from "react";
import { MdBook, MdPerson, MdQuiz, MdSchool } from "react-icons/md";
import { OverviewStates } from "../context";

const Stats = () => {
  const { data } = useContext(OverviewStates);

  if (!data.totalOverview) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div className="shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="p-4 sm:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium text-green-600 dark:text-green-400">
            Total Students
          </h3>
          <MdPerson size={20} className="text-gray-600 dark:text-gray-400" />
        </div>
        <div className="p-4 sm:p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalOverview.totalStudents}
          </div>
        </div>
      </div>
      <div className="shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="p-4 sm:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium text-pink-600 dark:text-pink-400">
            Active Courses
          </h3>
          <MdBook size={20} className="text-gray-600 dark:text-gray-400" />
        </div>
        <div className="p-4 sm:p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalOverview.activeCourses}
          </div>
        </div>
      </div>
      <div className="shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="p-4 sm:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium text-crimson-600 dark:text-crimson-400">
            School Partners
          </h3>
          <MdSchool size={20} className="text-gray-600 dark:text-gray-400" />
        </div>
        <div className="p-4 sm:p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalOverview.totalSchool}
          </div>
        </div>
      </div>
      <div className="shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
        <div className="p-4 sm:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium text-yellow-600 dark:text-yellow-400">
            Total Quizzes
          </h3>
          <MdQuiz size={20} className="text-gray-600 dark:text-gray-400" />
        </div>
        <div className="p-4 sm:p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalOverview.totalQuizzes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
