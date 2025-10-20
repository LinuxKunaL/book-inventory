import { Fragment, useContext } from "react";
import { Progress } from "@radix-ui/themes";
import { MdAccessTime, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import { QuizResultStates } from "../context";

function TabSummary() {
  const { data } = useContext(QuizResultStates);

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border shadow-sm p-3 sm:p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="pb-3">
            <h3 className="font-semibold tracking-tight text-base sm:text-lg flex items-center gap-2">
              <MdCheckCircle className="size-5 text-green-600" />
              Correct Answers
            </h3>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data.result.correct}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              out of {data.quiz.questionsLength} questions
            </p>
          </div>
        </div>

        <div className="rounded-lg border shadow-sm p-3 sm:p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="pb-3">
            <h3 className="font-semibold tracking-tight text-base sm:text-lg flex items-center gap-2">
              <MdErrorOutline className="size-5 text-red-600" />
              Incorrect Answers
            </h3>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {data.result.wrong}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              questions to review
            </p>
          </div>
        </div>

        <div className="rounded-lg border shadow-sm p-3 sm:p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="pb-3">
            <h3 className="font-semibold tracking-tight text-base sm:text-lg flex items-center gap-2">
              <MdAccessTime className="size-5 text-blue-600" />
              Time Efficiency
            </h3>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.floor((data.timeSpent / 60 / data.quiz.timeLimit) * 100)} %
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              of time used
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border shadow-sm bg-white  dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-2 sm:p-4">
        <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white p-3 sm:p-4">
          Performance Analysis
        </h3>
        <div className="space-y-4 p-3 sm:p-4 pt-0">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Overall Performance
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {data.score}%
              </span>
            </div>
            <Progress value={data.score} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-0 sm:pt-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Strengths
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {data.result.correct >
                  (data.quiz.questionsLength || 0) * 0.6 && (
                  <li>• Good understanding of basic concepts</li>
                )}
                {data.timeSpent < data.quiz.timeLimit * 60 * 0.8 && (
                  <li>• Efficient time management</li>
                )}
                {data.score >= data.quiz.passingScore && (
                  <li>• Met the passing requirements</li>
                )}
                {data.score >= 90 && <li>• Excellent performance</li>}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Areas for Improvement
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {data.result.correct <
                  (data.quiz.questionsLength || 0) * 0.7 && (
                  <li>• Review fundamental concepts</li>
                )}
                {!(data.result.wrong === 0) && (
                  <li>• Focus on weak areas for future quizzes</li>
                )}
                <li>• Continue practicing with course materials</li>
                <li>• Review explanations for missed questions</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
              Important Note
            </h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              This quiz has been completed and cannot be retaken. Your final
              score is {data.score}% has been recorded. Use this feedback to
              improve your understanding for future assessments.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TabSummary;
