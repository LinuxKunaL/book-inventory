import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TEnrolledCourses } from "../context";

type TContextType = {
  data: TEnrolledCourses;
  setData: Dispatch<SetStateAction<TEnrolledCourses>>;
};

export const CoursesViewStates = createContext<TContextType>({
  data: {} as TEnrolledCourses,
  setData: () => {},
});

function CoursesViewProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TEnrolledCourses>({} as TEnrolledCourses);
  return (
    <CoursesViewStates.Provider value={{ data, setData }}>
      {children}
    </CoursesViewStates.Provider>
  );
}

export default CoursesViewProvider;
