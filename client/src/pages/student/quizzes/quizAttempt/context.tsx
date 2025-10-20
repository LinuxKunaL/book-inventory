import { toast } from "@functions/toast/toast";
import useQuizApi from "@hooks/api/student/useQuiz.api";
import type { TQuizData } from "@types_/quiz";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";

type TContextType = {
  data: TQuizData;
  setData: Dispatch<SetStateAction<TQuizData>>;
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  answers: { [key: string]: number };
  setAnswers: Dispatch<SetStateAction<{ [key: string]: number }>>;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  showSubmitDialog: boolean;
  setShowSubmitDialog: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  loading: boolean;
};

export const QuizAttemptStates = createContext<TContextType>(
  {} as TContextType
);

function QuizAttemptProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TQuizData>({} as TQuizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const { quizSubmit, loading } = useQuizApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.timeLimit) {
      setTimeLeft(Number(data.timeLimit) * 60);
    }
  }, [data.timeLimit]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleSubmit = useCallback(() => {
    if (!data._id) return;

    const result = {
      quizId: data._id,
      answers,
      completedAt: new Date().toISOString(),
      timeSpent: timeLeft,
    };
    toast.processing(quizSubmit(result), {
      loadingText: "Submitting...",
      successText: () => {
        setShowSubmitDialog(false);
        navigate("/dashboard/quizzes");
        return "Quiz submitted successfully";
      },
      errorText: (error) => {
        return error.data.error || "Failed to submit quiz";
      },
    });
  }, [answers, data._id, timeLeft]);

  return (
    <QuizAttemptStates.Provider
      value={{
        data,
        setData,
        currentQuestion,
        setCurrentQuestion,
        answers,
        setAnswers,
        timeLeft,
        setTimeLeft,
        showSubmitDialog,
        setShowSubmitDialog,
        handleSubmit,
        loading,
      }}
    >
      {children}
    </QuizAttemptStates.Provider>
  );
}

export default QuizAttemptProvider;
