import { setNotificationCount } from "@slice/student/notificationSlice";
import type { TStudentMe } from "@types_/student";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";

type TContextType = {
  student: TStudentMe;
  setStudent: Dispatch<SetStateAction<TStudentMe>>;
  isSideMenu: boolean;
  setIsSideMenu: Dispatch<SetStateAction<boolean>>;
};

export const StudentMeStates = createContext<TContextType>({} as TContextType);

function StudentMeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [student, setStudent] = useState<TStudentMe>({} as TStudentMe);
  const [isSideMenu, setIsSideMenu] = useState(false);

  useEffect(() => {
    dispatch(setNotificationCount(student.notificationCount || 0));
  }, [student.notificationCount, dispatch]);

  return (
    <StudentMeStates.Provider
      value={{ student, setStudent, isSideMenu, setIsSideMenu }}
    >
      {children}
    </StudentMeStates.Provider>
  );
}

export default StudentMeProvider;
