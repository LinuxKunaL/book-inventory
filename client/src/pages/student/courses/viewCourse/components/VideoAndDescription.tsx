import { useContext, useRef, useState } from "react";
import { LessonDataStates } from "./context";
import LessonNotFound from "./LessonNotFound";
import { CoursesViewStates } from "../context";
import { toast } from "@functions/toast/toast";
import VideoPlayer from "@components/interfaces/VideoPlayer";
import ActionModal from "@components/interfaces/ActionModal";

function VideoAndDescription() {
  const { currentLesson, setTractProgress, setCurrentLesson, tractProgress } =
    useContext(LessonDataStates);
  const videoSrc =
    import.meta.env.VITE_API_URL +
    "/api/other/uploads?type=video&filename=" +
    currentLesson?.video?.name;
  const {
    data: { course, currentVideoTime },
  } = useContext(CoursesViewStates);
  const [isNextDialog, setIsNextDialog] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [time, setTime] = useState(0);
  const RefTime = useRef<NodeJS.Timeout>(null);

  var nextLesson = 0;

  if (Object.entries(currentLesson).length === 0) {
    return <LessonNotFound />;
  }

  const handleOnEnd = () => {
    if (tractProgress.courseCompleted) {
      setIsNextDialog(true);
      return;
    }
    setTractProgress((prev) => ({
      ...prev,
      completedLessons: [...prev.completedLessons, prev.currentLesson],
      currentVideoTime: 0,
      isEdited: true,
    }));
    const nextLesson = course.lessons.indexOf(currentLesson) + 1;

    if (Number(course.lessonsLength) === nextLesson) {
      setTractProgress((prev) => ({
        ...prev,
        currentVideoTime: 0,
        courseCompleted: true,
      }));
      return toast.success("You have completed the course!");
    }

    setIsNextDialog(true);
  };

  const handelOnTimeUpdate = (
    event: React.MouseEvent<HTMLVideoElement>
  ): void => {
    const { currentTime } = event.currentTarget;

    setTractProgress((prev) => ({
      ...prev,
      currentVideoTime: currentTime,
      isEdited: initialLoad,
    }));

    setInitialLoad(true);
  };

  const handleOnLoadedData = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.currentTime = currentVideoTime;
  };

  const handleNextLesson = () => {
    const lesson = course.lessons[nextLesson + 1];
    setCurrentLesson(lesson);
    setTractProgress((prev) => ({
      ...prev,
      currentLesson: lesson.id,
      currentLessonTitle: lesson.title,
    }));
    setIsNextDialog(false);
  };

  const handleOnPlay = () => {
    RefTime.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const handleOnPause = () => {
    if (RefTime.current) {
      clearInterval(RefTime.current);
    }
    setTractProgress((prev) => ({
      ...prev,
      watchSeconds: prev.watchSeconds + time,
    }));
    setTime(0);
  };

  return (
    <div className=" shadow-sm p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div>
        <VideoPlayer
          onEnded={handleOnEnd}
          onTimeUpdate={handelOnTimeUpdate}
          onLoadedData={handleOnLoadedData}
          onPlay={handleOnPlay}
          onPause={handleOnPause}
          src={videoSrc}
        />
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {currentLesson?.title}
        </h2>
        <div
          className="space-y-4 text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: currentLesson?.description || "" }}
        />
      </div>
      {isNextDialog && (
        <ActionModal
          description="You are about to start the next lesson?"
          no={() => setIsNextDialog(false)}
          yes={handleNextLesson}
          title="Next Lesson"
          yesColor="crimson"
          yesText="Next Lesson"
        />
      )}
    </div>
  );
}

export default VideoAndDescription;
