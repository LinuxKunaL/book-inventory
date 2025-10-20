import { Fragment, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { CoursesViewStates } from "../context";
import { Button, Progress } from "@radix-ui/themes";
import { LessonDataStates } from "./context";
import { Link } from "react-router";

function Header() {
  const { data } = useContext(CoursesViewStates);
  const { updateCourseProgress } = useContext(LessonDataStates);

  return (
    <Fragment>
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Link to="/dashboard/courses" onClick={updateCourseProgress}>
          <Button variant="ghost" radius="medium" size="3">
            <BiArrowBack />
            Back to Courses
          </Button>
        </Link>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-crimson-50 dark:from-blue-900/20 dark:to-crimson-900/20 rounded-2xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700/50 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="sm:w-1/2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {data.course?.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {data.course?.description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {data.progress}% Complete
            </div>
            <Progress variant="soft" value={data.progress} size={"2"} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
