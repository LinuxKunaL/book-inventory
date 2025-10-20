import { useContext } from "react";
import { QuizAttemptStates } from "../context";
import { Button, RadioGroup } from "@radix-ui/themes";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function QuestionsView() {
  const {
    data,
    answers,
    setAnswers,
    currentQuestion,
    setCurrentQuestion,
    setShowSubmitDialog,
  } = useContext(QuizAttemptStates);

  if (Object.entries(data).length === 0) {
    return null;
  }

  const currentQuestionData = data.questions[currentQuestion];

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <div className="text-lg">Questions</div>
        <div className="rounded-lg border  shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-3 mt-3">
          <div className="grid grid-cols-5 lg:grid-cols-5 gap-2">
            {data.questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => setCurrentQuestion(index)}
                className={`p-2 rounded-lg text-sm font-medium transition-colors relative ${
                  index === currentQuestion
                    ? "bg-crimson-500 text-white"
                    : answers[question.id] !== undefined
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-crimson-500 rounded"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <span>Not answered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-xl mb-2">Question {currentQuestion + 1}</div>
            <p className="text-gray-900 dark:text-gray-200 text-lg leading-relaxed">
              {currentQuestionData.question}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <RadioGroup.Root
            value={answers[currentQuestionData.id]?.toString() || ""}
            onValueChange={(value) =>
              handleAnswerChange(
                currentQuestionData.id,
                Number.parseInt(value)
              )
            }
          >
            {currentQuestionData.options.map((option, index) => {
              index += 1;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3 mt-2"
                >
                  <RadioGroup.Item
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-gray-900 dark:text-white"
                  >
                    {option}
                  </label>
                </div>
              );
            })}
          </RadioGroup.Root>
          <div className="flex items-center justify-between pt-6">
            <Button
              variant="outline"
              size="3"
              radius="medium"
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <MdChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex gap-3">
              {currentQuestion === Number(data.questionsLength) - 1 ? (
                <Button
                  variant="solid"
                  size="3"
                  radius="medium"
                  onClick={() => setShowSubmitDialog(true)}
                  color="green"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  variant="solid"
                  size="3"
                  radius="medium"
                  onClick={() =>
                    setCurrentQuestion(
                      Math.min(
                        Number(data.questionsLength) - 1,
                        currentQuestion + 1
                      )
                    )
                  }
                  className="bg-crimson-500 hover:bg-crimson-600 text-white flex items-center gap-2"
                >
                  Next
                  <MdChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsView;
