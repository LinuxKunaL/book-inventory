import { useCallback, useContext, useState } from "react";
import { BsLayers } from "react-icons/bs";
import { BiBookOpen } from "react-icons/bi";
import { useSearchParams } from "react-router";
import { toast } from "@functions/toast/toast";
import { CoursesBrowseStates } from "../context";
import { Badge, Button } from "@radix-ui/themes";
import Pagination from "@components/interfaces/Pagination";
import useCourseApi from "@hooks/api/student/useCourse.api";
import { MdAccessTime, MdPersonOutline } from "react-icons/md";
import ActionModal from "@components/interfaces/ActionModal";
import ItemsNotFound from "@components/others/ItemsNotFound";
import { getDifficultyColor } from "@utils/colors/getDifficultyColor";
import { getThumbnailUrl } from "@utils/getThumbnailUrl";

function CoursesList() {
  const [pageParam, setPageParam] = useSearchParams({ page: "1" });
  const { courseEnroll, loading } = useCourseApi();
  const { data } = useContext(CoursesBrowseStates);
  const [openEnrollDialog, setOpenEnrollDialog] = useState({
    visible: false,
    id: "",
  });

  const handleResetEnrollDialog = () => {
    setOpenEnrollDialog({ visible: false, id: "" });
  };

  const handleEnrollCourse = useCallback(() => {
    toast.processing(courseEnroll(openEnrollDialog.id), {
      loadingText: "Enrolling course..",
      successText: () => "Course enrolled successfully",
      errorText: (response) => response.data.error,
    });
    handleResetEnrollDialog();
  }, [openEnrollDialog.id]);

  return (
    <div className="flex-1 justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.courses.map((course, index) => (
          <div
            key={index}
            className="shadow-sm overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 w-auto"
          >
            <div className="relative">
              <img
                loading="lazy"
                decoding="async"
                className="object-cover h-40 sm:h-56 w-full"
                alt={course.title}
                src={getThumbnailUrl(course.thumbnail)}
                style={{ color: "transparent" }}
              />
            </div>
            <div className="p-3 sm:m-5 space-y-3 ">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                  {course.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                {course.description}
              </p>
              <Badge
                size="2"
                variant="soft"
                color={getDifficultyColor(course.difficulty)}
              >
                {course.difficulty}
              </Badge>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <BiBookOpen size={16} />
                  {course.lessonsLength} lessons
                </span>
                <span className="flex items-center gap-1">
                  <BsLayers size={16} />
                  {course.category}
                </span>
                <span className="flex items-center gap-1">
                  <MdAccessTime size={16} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MdPersonOutline size={16} />
                  {course.studentEnrolled}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Button
                  onClick={() =>
                    setOpenEnrollDialog({ visible: true, id: course._id })
                  }
                  disabled={loading}
                  variant="solid"
                  radius="medium"
                  size="3"
                >
                  Enroll Now
                </Button>
                <Badge size="3" variant="soft">
                  {course.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data.courses.length == 0 && (
        <ItemsNotFound
          type="course"
          className="h-full"
          title="No course found"
          buttonText="My Courses"
          buttonLink="/dashboard/courses"
        />
      )}
      <div className="mt-5">
        <Pagination
          length={data.totalCourses}
          setPage={setPageParam}
          page={pageParam}
        />
      </div>
      {openEnrollDialog.visible && (
        <ActionModal
          description="Are you sure to enroll this course?"
          no={handleResetEnrollDialog}
          yes={handleEnrollCourse}
          title="Enroll Course"
          yesColor="green"
          yesText="Enroll"
        />
      )}
    </div>
  );
}

export default CoursesList;
