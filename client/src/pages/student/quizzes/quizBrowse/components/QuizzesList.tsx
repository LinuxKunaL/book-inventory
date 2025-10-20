import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { QuizzesBrowseStates } from "../context";
import { Badge, Button } from "@radix-ui/themes";
import Pagination from "@components/interfaces/Pagination";
import { MdAccessTime, MdPerson, MdPlayArrow } from "react-icons/md";
import ActionModal from "@components/interfaces/ActionModal";
import ItemsNotFound from "@components/others/ItemsNotFound";
import { getDifficultyColor } from "@utils/colors/getDifficultyColor";

function QuizzesList() {
  const [pageParam, setPageParam] = useSearchParams({ page: "1" });
  const { data } = useContext(QuizzesBrowseStates);
  const navigate = useNavigate();
  const [openStartDialog, setOpenStartDialog] = useState({
    visible: false,
    id: "",
  });

  const handleStartQuiz = () => {
    navigate(`/dashboard/quiz/${openStartDialog.id}/attempt`);
  };

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {data?.quizzes?.map((quiz) => (
          <div
            key={quiz._id}
            className="rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-1.5 p-4 sm:p-6 sm:pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    {quiz.title}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {quiz.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge size="2" color={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 sm:pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MdPerson className="w-4 h-4" />
                    <span>{quiz.questionsLength} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAccessTime className="w-4 h-4" />
                    <span>{quiz.timeLimit} min</span>
                  </div>
                </div>{" "}
                <Button
                  size="3"
                  variant="solid"
                  onClick={() =>
                    setOpenStartDialog({ visible: true, id: quiz._id || "" })
                  }
                  radius="medium"
                  className="w-full bg-crimson-500 hover:bg-crimson-600 text-white flex items-center gap-2"
                >
                  <MdPlayArrow className="w-4 h-4" />
                  Start Quiz
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data.totalQuizzes == 0 && (
        <ItemsNotFound
          type="quiz"
          className="h-full"
          title="No Quizzes found"
          buttonText="My Courses"
          buttonLink="/dashboard/quizzes"
        />
      )}
      {openStartDialog.visible && (
        <ActionModal
          yesColor="crimson"
          yesText="Start"
          title="Start Quiz ?"
          description="Are you sure you want to start this quiz?"
          yes={handleStartQuiz}
          no={() => setOpenStartDialog({ visible: false, id: "" })}
        />
      )}
      <div className="mt-6">
        <Pagination
          length={data.totalQuizzes}
          setPage={setPageParam}
          page={pageParam}
        />
      </div>
    </div>
  );
}

export default QuizzesList;
