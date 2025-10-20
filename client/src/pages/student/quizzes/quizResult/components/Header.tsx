import { Button } from "@radix-ui/themes";
import { useContext } from "react";
import { BiBookOpen } from "react-icons/bi";
import { MdArrowLeft } from "react-icons/md";
import { Link } from "react-router";
import { QuizResultStates } from "../context";

function Header() {
  const { data } = useContext(QuizResultStates);
  return (
    <div className="flex sm:items-center justify-between flex-col sm:flex-row">
      <div className="flex sm:items-center gap-4 sm:flex-row flex-col">
        <Link to="/dashboard/quizzes">
          <Button variant="ghost" radius="medium" size="3">
            <MdArrowLeft className="w-4 h-4" />
            Back to Quizzes
          </Button>
        </Link>
        <div className="sm:ml-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quiz Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{data.quiz?.title}</p>
        </div>
      </div>
      <div className="flex gap-3 sm:mt-0 mt-4">
        <Link to="/dashboard/courses">
          <Button variant="soft" radius="medium" size="3">
            <BiBookOpen className="w-4 h-4" />
            Continue Learning
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
