import type {  TResultQuiz } from "@types_/quiz";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TContextType = {
  data: TResultQuiz;
  setData: Dispatch<SetStateAction<TResultQuiz>>;
};

export const QuizResultStates = createContext<TContextType>({} as TContextType);

function QuizResultProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TResultQuiz>({} as TResultQuiz);
  return (
    <QuizResultStates.Provider value={{ data, setData }}>
      {children}
    </QuizResultStates.Provider>
  );
}

export default QuizResultProvider;
