import type { TQuizData } from "@types_/quiz";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TDataQuiz = { quizzes: TQuizData[]; totalQuizzes: number };

type TContextType = {
  data: TDataQuiz;
  setData: Dispatch<SetStateAction<TDataQuiz>>;
};

export const QuizzesBrowseStates = createContext<TContextType>({
  data: { quizzes: [], totalQuizzes: 0 },
  setData: () => {},
});

function QuizzesBrowseProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TDataQuiz>({
    quizzes: [],
    totalQuizzes: 0,
  });
  return (
    <QuizzesBrowseStates.Provider value={{ data, setData }}>
      {children}
    </QuizzesBrowseStates.Provider>
  );
}

export default QuizzesBrowseProvider;
