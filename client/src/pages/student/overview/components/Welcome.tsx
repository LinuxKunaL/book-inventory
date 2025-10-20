import { Link } from "react-router";
import { Button } from "@radix-ui/themes";
import { MdPlayArrow } from "react-icons/md";

function Welcome() {
  return (
    <div className="bg-gradient-to-r from-crimson-500 to-blue-600 dark:from-crimson-600 dark:to-blue-700 rounded-2xl p-5 sm:p-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome back ! 👋
          </h1>
          <p className="text-crimson-100 dark:text-crimson-200 text-base sm:text-lg">
            Ready to continue your financial literacy journey?
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:w-auto w-full">
          <Link to="/dashboard/courses" className="sm:w-auto w-full">
            <Button
              className="!bg-white/20 hover:!bg-white/30 !text-white !border !border-white/30 sm:w-auto !w-full"
              radius="medium"
              size="3"
            >
              <MdPlayArrow className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </Link>
          <Link to="/dashboard/quizzes/browse" className="sm:w-auto w-full">
            <Button
              variant="outline"
              radius="medium"
              color="gray"
              className="!border-white/30 !text-white hover:!bg-white/10 !bg-transparent sm:w-auto !w-full"
              size="3"
            >
              Browse Quizzes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
