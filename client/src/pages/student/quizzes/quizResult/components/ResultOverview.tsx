import { Badge, Progress } from "@radix-ui/themes";
import { IoMdTrophy } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { QuizResultStates } from "../context";
import { useContext } from "react";

function ResultOverview() {
  const { data } = useContext(QuizResultStates);

  const getScoreColor = () => {
    if (data.score >= 90) return "text-green-600 dark:text-green-400";
    if (data.score >= data.quiz.passingScore)
      return "text-blue-600 dark:text-blue-400";
    return "text-red-600 dark:text-red-400";
  };

  const timeSpentMinutes = Math.floor(data.timeSpent / 60);
  const timeSpentSeconds = data.timeSpent % 60;

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center">
        {data.status === "passed" ? (
          <div className="size-14 sm:size-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <IoMdTrophy className="size-7 sm:size-8 text-green-600 dark:text-green-400" />
          </div>
        ) : (
          <div className="size-14 sm:size-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <MdErrorOutline className="size-7 sm:size-8 text-red-600 dark:text-red-400" />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {data.status === "passed" ? "Congratulations!" : "Quiz Completed"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {data.status === "passed"
            ? "You've successfully passed the quiz!"
            : `You scored ${data.score}%. The passing score was ${data.quiz.passingScore}%.`}
        </p>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <div className={`text-xl sm:text-4xl font-bold ${getScoreColor()}`}>
            {Math.floor(data.score)}%
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Your Score</p>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {data.result.correct}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Correct Answers
          </p>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {timeSpentMinutes}:{timeSpentSeconds.toString().padStart(2, "0")}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Time Spent</p>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <Progress value={data.score} className="h-3" />
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span>0%</span>
          <span>Passing: {data.quiz.passingScore}%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Badge size="2" color={data.status === "passed" ? "green" : "red"}>
          {data.status === "passed" ? "PASSED" : "NOT PASSED"}
        </Badge>
        <Badge size="2" color="gray">
          QUIZ COMPLETED - NO RETAKES
        </Badge>
      </div>

      {!(data.status === "passed") && (
        <div className="mt-4 p-3   sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            <strong>Study Recommendation:</strong> Review the course materials
            and focus on the topics you missed. Consider taking additional
            practice exercises before attempting other quizzes.
          </p>
        </div>
      )}
    </div>
  );
}

export default ResultOverview;
