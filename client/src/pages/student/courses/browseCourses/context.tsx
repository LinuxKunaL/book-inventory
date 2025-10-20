import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TCourse } from "src/types/course";

type TDataCourse = {
  courses: TCourse[];
  totalCourses: number;
};

type TContextType = {
  data: TDataCourse;
  setData: Dispatch<SetStateAction<TDataCourse>>;
};

export const CoursesBrowseStates = createContext<TContextType>({
  data: { courses: [], totalCourses: 0 },
  setData: () => {},
});

function CoursesBrowseProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TDataCourse>({
    courses: [],
    totalCourses: 0,
  });
  return (
    <CoursesBrowseStates.Provider value={{ data, setData }}>
      {children}
    </CoursesBrowseStates.Provider>
  );
}

export default CoursesBrowseProvider;
