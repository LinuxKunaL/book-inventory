import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TCourse } from "src/types/course";

export type TEnrolledCourses = {
  course: TCourse;
  isCompleted: boolean;
  progress: number;
  currentLesson: string;
  currentVideoTime: number;
  currentLessonTitle: string;
  completedLessons: string[];
  createdAt: string;
};

type TStats = {
  inProgress: number;
  completed: number;
  totalHours: number;
};

type TCoursesData = {
  courses: TEnrolledCourses[];
  stats: TStats;
};

type TContextType = {
  data: TCoursesData;
  setData: Dispatch<SetStateAction<TCoursesData>>;
};

export const CoursesStates = createContext<TContextType>({} as TContextType);

function CoursesProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TCoursesData>({} as TCoursesData);
  return (
    <CoursesStates.Provider value={{ data, setData }}>
      {children}
    </CoursesStates.Provider>
  );
}

export default CoursesProvider;
