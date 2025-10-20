import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TDashboardOverview = {
  totalOverview: {
    totalStudents: number;
    activeCourses: number;
    totalSchool: number;
    totalQuizzes: number;
  };
  topPerformingStudents: {
    quizzesCompleted: number;
    coursesCompleted: number;
    overallProgress: number;
    student: {
      _id: string;
      studentName: string;
      school: {
        _id: string;
        schoolName: string;
      };
    };
  }[];
  recentQuizzes: {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    participantsCount: number;
  }[];
};

type TContextType = {
  data: TDashboardOverview;
  setData: Dispatch<SetStateAction<TDashboardOverview>>;
};

export const OverviewStates = createContext<TContextType>({} as TContextType);

function OverviewProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TDashboardOverview>(
    {} as TDashboardOverview
  );
  return (
    <OverviewStates.Provider value={{ data, setData }}>
      {children}
    </OverviewStates.Provider>
  );
}

export default OverviewProvider;
