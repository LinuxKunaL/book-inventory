import clsx from "clsx";
import { useContext } from "react";
import { Badge } from "@radix-ui/themes";
import { MdCheckCircle, MdErrorOutline } from "react-icons/md";
import { QuizResultStates } from "../context";

function TabReview() {
  const { data } = useContext(QuizResultStates);

  return data.questionsReview.map((question, index: number) => {
    const studentAnswer = question.studentAnswer;
    const isCorrect = studentAnswer === question.correctAnswer;
    return (
      <div
        key={question.id}
        className="rounded-lg border  shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold tracking-tight text-lg flex items-center gap-2 text-gray-900 dark:text-white">
              Question {index + 1}
              {isCorrect ? (
                <MdCheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <MdErrorOutline className="w-5 h-5 text-red-600" />
              )}
            </h3>
            <p className="text-gray-900 dark:text-white mt-2">
              {question.question}
            </p>
          </div>
          <Badge color={isCorrect ? "green" : "red"} size="2">
            {isCorrect ? "Correct" : "Incorrect"}
          </Badge>
        </div>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            {question.options.map((option: any, optionIndex: number) => {
              optionIndex += 1;
              return (
                <div
                  key={optionIndex}
                  className={clsx(
                    "p-3 rounded-lg border transition-colors",
                    optionIndex === question.correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : optionIndex === studentAnswer && !isCorrect
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full border-2",
                        optionIndex === question.correctAnswer
                          ? "border-green-500 bg-green-500"
                          : optionIndex === studentAnswer && !isCorrect
                          ? "border-red-500 bg-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      )}
                    >
                      {(optionIndex === question.correctAnswer ||
                        (optionIndex === studentAnswer && !isCorrect)) && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {option}
                    </span>
                    {optionIndex === question.correctAnswer && (
                      <Badge size="2" variant="outline" color="green">
                        Correct Answer
                      </Badge>
                    )}
                    {optionIndex === studentAnswer && !isCorrect && (
                      <Badge size="2" variant="outline" color="red">
                        Your Answer
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {question.explanation && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                Explanation
              </h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  });
}

export default TabReview;
