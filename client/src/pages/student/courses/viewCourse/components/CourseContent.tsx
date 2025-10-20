import clsx from "clsx";
import { memo, useContext, useEffect } from "react";
import { CoursesViewStates } from "../context";
import {
  MdAccessTime,
  MdCheckCircle,
  MdOutlineCircle,
  MdPlayCircleOutline,
} from "react-icons/md";
import { LessonDataStates } from "./context";

function CourseContent() {
  const { data } = useContext(CoursesViewStates);
  const { setCurrentLesson, currentLesson, setTractProgress } =
    useContext(LessonDataStates);

  const handleOpenLesson = (lesson: any, fromEffect: boolean) => {
    setTractProgress((prev) => ({
      ...prev,
      currentLesson: lesson.id,
      currentLessonTitle: lesson.title,
      isEdited: fromEffect ? false : true,
    }));
    setCurrentLesson(lesson);
  };

  useEffect(() => {
    if (data.currentLesson) {
      const lesson = data.course?.lessons.find(
        (lesson) => lesson.id === data.currentLesson
      );
      handleOpenLesson(lesson, true);
    }
  }, [data.currentLesson]);

  const getLessonCompletion = (id: string) => {
    const isCurrentLesson = id === currentLesson.id;
    const isCompleted = data.completedLessons.includes(id);

    if (isCurrentLesson) {
      if (isCompleted) {
        return <MdCheckCircle className="text-green-500" size={20} />;
      } else {
        return <MdPlayCircleOutline className="text-crimson-500" size={20} />;
      }
    } else {
      if (isCompleted) {
        return <MdCheckCircle className="text-green-500" size={20} />;
      } else {
        return <MdOutlineCircle color="gray" size={20} />;
      }
    }
  };

  return (
    <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
        Course Content
      </h3>
      <div className="space-y-2">
        {data.course?.lessons.map((lesson) => (
          <div
            onClick={() => handleOpenLesson(lesson, false)}
            className={clsx(
              "w-full flex items-center gap-3 p-2 sm:p-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer select-none",
              lesson.id === currentLesson.id &&
                "bg-gray-100 dark:bg-crimson-700/20"
            )}
          >
            {getLessonCompletion(lesson.id)}
            <div className="flex-1 w-10">
              <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                {lesson.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MdAccessTime className="size-4 sm:size-5" />
                {lesson.video.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(CourseContent);
