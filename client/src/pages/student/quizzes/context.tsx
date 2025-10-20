import type { TAttemptedQuiz } from "@types_/quiz";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TDataQuiz = {
  quizzes: TAttemptedQuiz[];
  totalQuizzes: number;
  stats: {
    attempted: number;
    passed: number;
    averageScore: number;
  };
};

type TContextType = {
  data: TDataQuiz;
  setData: Dispatch<SetStateAction<TDataQuiz>>;
};

export const QuizzesStates = createContext<TContextType>({} as TContextType);

function QuizzesProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TDataQuiz>({} as TDataQuiz);

  return (
    <QuizzesStates.Provider value={{ data, setData }}>
      {children}
    </QuizzesStates.Provider>
  );
}

export default QuizzesProvider;
