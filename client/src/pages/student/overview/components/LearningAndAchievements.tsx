import { Button, IconButton, Progress } from "@radix-ui/themes";
import { FaAward } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import { MdBook, MdPlayArrow } from "react-icons/md";
import { OverviewStates } from "../context";
import { useContext } from "react";
import { Link } from "react-router";

function LearningAndAchievements() {
  const { data } = useContext(OverviewStates);

  if (!data.progressCourses) {
    return null;
  }
  
  return (
    <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="lg:col-span-2 shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Continue Learning
          </h2>
          <Link to="/dashboard/courses">
            <Button radius="medium" size="2" variant="solid">
              View All
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {data.progressCourses.map((course, index) => (
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              {index == 0 && (
                <div className="w-16 h-16 bg-gradient-to-r from-crimson-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <IoMdBook size={32} color="white" />
                </div>
              )}
              {index == 1 && (
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <MdBook size={32} color="white" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {course.course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chapter : {course.currentLessonTitle}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={course.progress} variant="soft" size="2" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {course.progress}%
                  </span>
                </div>
              </div>
              <Link to={`/dashboard/courses/${course.course._id}`}>
                <Button variant="soft" radius="medium" size="3">
                  <MdPlayArrow />
                  Continue
                </Button>
              </Link>
            </div>
          ))}
          {data.progressCourses.length == 0 && (
            <p className="text-gray-600 dark:text-gray-400">
              You are currently not learning any course
            </p>
          )}
        </div>
      </div>
      <div className="shadow-sm p-4 sm:p-6 justify-between flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Recent Achievements
            </h2>
            <FaAward className="text-yellow-500" size={22} />
          </div>
          <div className="space-y-5">
            {data.achievements.map(({ achievement }, index) => (
              <div className="flex items-center gap-3">
                <IconButton
                  variant="soft"
                  color={
                    index == 0 ? "yellow" : index == 1 ? "green" : "purple"
                  }
                >
                  {achievement.icon}
                </IconButton>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {achievement.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
            {data.achievements.length == 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No recent achievements
              </p>
            )}
          </div>
        </div>
        <Link to="/dashboard/achievements">
          <Button
            className="!mt-5 !w-full"
            radius="medium"
            size="3"
            variant="outline"
          >
            View All Achievements
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LearningAndAchievements;
