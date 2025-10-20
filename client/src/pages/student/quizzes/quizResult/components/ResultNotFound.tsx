import { Button } from "@radix-ui/themes";
import { Link } from "react-router";



function ResultNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Results Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We couldn't find your quiz results. Please try taking the quiz again.
        </p>
        <Link to="/dashboard/quizzes">
          <Button variant="soft" radius="medium" size="3">
            Back to Quizzes
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ResultNotFound;
