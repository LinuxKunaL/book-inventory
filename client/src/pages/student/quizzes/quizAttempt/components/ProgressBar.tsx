import { useContext } from "react";
import { QuizAttemptStates } from "../context";
import { Progress } from "@radix-ui/themes";



function ProgressBar() {
  
  const { currentQuestion, data, answers } = useContext(QuizAttemptStates);
  const progress = ((currentQuestion + 1) / Number(data.questionsLength)) * 100;
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {data.questionsLength}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {answeredQuestions} answered
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}

export default ProgressBar;
