import { useContext } from "react";
import { useNavigate } from "react-router";
import { CoursesStates } from "../context";
import { FaRegClock } from "react-icons/fa";
import { formatDate } from "@utils/format/formatDate";
import { MdCheck, MdPlayArrow } from "react-icons/md";
import { Badge, Button, Progress } from "@radix-ui/themes";
import ItemsNotFound from "@components/others/ItemsNotFound";

function CoursesList() {
  const navigate = useNavigate();
  const { data } = useContext(CoursesStates);

  if (!data.courses) {
    return null;
  }
  const getCourseButtonLabel = (progress: number) => {
    if (progress === 100) {
      return (
        <>
          <MdCheck /> Review
        </>
      );
    }

    if (progress === 0) {
      return (
        <>
          <MdPlayArrow /> Start Course
        </>
      );
    }

    if (progress > 0 && progress < 100) {
      return (
        <>
          <MdPlayArrow /> Continue
        </>
      );
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "gray";
    if (progress === 100) return "green";
    return "yellow";
  };

  const getProgressText = (progress: number) => {
    if (progress === 0) return "Not Started";
    if (progress === 100) return "Completed";
    return "In Progress";
  };

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.courses.map((course) => (
          <div className="shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group space-y-4 justify-between flex flex-col">
            <div className="space-y-4">
              <div className="flex items-start justify-between relative">
                <div className="relative w-full z-0">
                  <img
                    alt="Budgeting Fundamentals thumbnail"
                    loading="lazy"
                    decoding="async"
                    className="object-cover h-40 sm:h-56 w-full rounded-lg"
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/api/other/uploads?type=thumbnail&filename=${
                      course.course.thumbnail
                    }`}
                    style={{ color: "transparent" }}
                  />
                </div>
                <Badge
                  size="2"
                  variant="solid"
                  className="absolute top-2 right-2 z-10"
                  color={getProgressColor(course.progress)}
                >
                  {getProgressText(course.progress)}
                </Badge>
              </div>
              <div>
                <div className="flex sm:items-center gap-2 mb-2 sm:flex-row flex-col">
                  <h3 className="font-bold text-gray-900 dark:text-white sm:text-lg group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors duration-200">
                    {course.course.title}
                  </h3>
                  <div>
                    <Badge variant="outline" color="gray">
                      {formatDate(course.createdAt)}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                  {course.course.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaRegClock />
                    {course.course.duration}
                  </span>
                </div>
              </div>
              {!course.isCompleted && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progress
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress variant="soft" value={course.progress} />
                </div>
              )}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-500">
                    {course.course.lessonsLength} lessons •{" "}
                    {course.course.difficulty} • {course.course.category}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Button
                size="3"
                variant="soft"
                radius="medium"
                className="!w-full"
                onClick={() => {
                  navigate(`/dashboard/courses/${course.course._id}`);
                }}
              >
                {getCourseButtonLabel(course.progress)}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {data.courses.length == 0 && (
        <ItemsNotFound
          type="course"
          className="h-full"
          title="No course found"
          buttonText="Browse Courses"
          buttonLink="/dashboard/courses/browse"
        />
      )}
    </div>
  );
}

export default CoursesList;
