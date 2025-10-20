import { Badge, Button } from "@radix-ui/themes";
import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router";
import { OverviewStates } from "../context";
import { useContext } from "react";
import { getDifficultyColor } from "@utils/colors/getDifficultyColor";

function LatestQuizzes() {
  const { data } = useContext(OverviewStates);
  if (!data.quizResults) {
    return null;
  }
  return (
    <div className="shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          Latest Quizzes
        </h2>
        <Link to="/dashboard/quizzes">
          <Button radius="medium" size="2" variant="solid">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.quizResults.map((quiz) => (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {quiz.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {quiz.description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MdAccessTime size={18} />
                  <span>{quiz.timeLimit}m</span>
                </div>

                <Badge
                  color={getDifficultyColor(quiz.difficulty)}
                  className="capitalize"
                >
                  {quiz.difficulty}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Link to={`/dashboard/quizzes/browse?search=${quiz.title}`}>
                  <Button variant="solid" size="3" radius="medium">
                    Start Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data.quizResults.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400 sm:mt-4">
          No quizzes found
        </p>
      )}
    </div>
  );
}

export default LatestQuizzes;
