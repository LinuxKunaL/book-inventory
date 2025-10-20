import useCourseApi from "@hooks/api/student/useCourse.api";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { useParams } from "react-router";
import type { TCourse } from "src/types/course";
import { CoursesViewStates } from "../context";
import useBackButton from "@hooks/others/useBackButton";

type TCurrentLesson = TCourse["lessons"][0];
type TTractProgress = {
  currentLesson: string;
  currentVideoTime: number;
  completedLessons: string[];
  courseCompleted: boolean;
  currentLessonTitle: string;
  isEdited: boolean;
  watchSeconds: number;
};

type TContextType = {
  tractProgress: TTractProgress;
  currentLesson: TCurrentLesson;
  setCurrentLesson: Dispatch<SetStateAction<TCurrentLesson>>;
  setTractProgress: Dispatch<SetStateAction<TTractProgress>>;
  updateCourseProgress: () => void;
};

export const LessonDataStates = createContext<TContextType>({} as TContextType);

function LessonDataProvider({ children }: { children: React.ReactNode }) {
  const {
    data: { isCompleted, course, completedLessons },
  } = useContext(CoursesViewStates);
  const [currentLesson, setCurrentLesson] = useState<TCurrentLesson>(
    {} as TCurrentLesson
  );
  const [tractProgress, setTractProgress] = useState<TTractProgress>({
    currentLesson: "",
    currentLessonTitle: "",
    currentVideoTime: 0,
    completedLessons: [],
    courseCompleted: false,
    isEdited: false,
    watchSeconds: 0,
  });
  const courseId = useParams().id;
  const { updateProgress } = useCourseApi();

  useEffect(() => {
    if (isCompleted) {
      setTractProgress((prev) => ({
        ...prev,
        courseCompleted: isCompleted,
      }));
    }
  }, [isCompleted]);

  useEffect(() => {
    if (completedLessons?.length != 0) {
      setTractProgress((prev) => ({
        ...prev,
        completedLessons: completedLessons || [],
      }));
    }
  }, [completedLessons]);

  const updateCourseProgress = useCallback(() => {
    if (!tractProgress.isEdited) return;
    updateProgress(courseId, {
      ...tractProgress,
      lessonsLength: course.lessonsLength,
    });
  }, [tractProgress]);

  /** browser Back button @handler */
  useBackButton(updateCourseProgress);

  return (
    <LessonDataStates.Provider
      value={{
        currentLesson,
        tractProgress,
        setCurrentLesson,
        setTractProgress,
        updateCourseProgress,
      }}
    >
      {children}
    </LessonDataStates.Provider>
  );
}

export default LessonDataProvider;
