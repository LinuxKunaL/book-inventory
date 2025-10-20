import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { QuizAttemptStates } from "../context";
import { Badge, Button } from "@radix-ui/themes";
import { formatTime } from "media-chrome/dist/utils/time.js";
import { MdAccessTime, MdArrowLeft, MdErrorOutline } from "react-icons/md";
import ActionModal from "@components/interfaces/ActionModal";

function Header() {
  const { data, timeLeft } = useContext(QuizAttemptStates);
  const [openBackDialog, setOpenBackDialog] = useState(false);
  const navigate = useNavigate();

  const getTimeColor = () => {
    const percentage = (timeLeft / (Number(data.timeLimit) * 60)) * 100;
    if (percentage > 50) return "text-green-600 dark:text-green-400";
    if (percentage > 25) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  useEffect(() => {
    window.addEventListener(
      "beforeunload",
      function (e) {
        e.preventDefault();
      },
      false
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        function (e) {
          e.preventDefault();
        },
        false
      );
    };
  }, []);


  const navigateBack = () => {
    navigate("/dashboard/quizzes");
    setOpenBackDialog(false);
  };

  return (
    <div className="flex sm:items-center justify-between sm:flex-row flex-col sm:flex-wrap items-start">
      <div className="flex sm:items-center items-start gap-4 flex-col sm:flex-row">
        <Button
          onClick={() => setOpenBackDialog(true)}
          variant="ghost"
          radius="medium"
          size="3"
        >
          <MdArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </Button>
        <div className="sm:ml-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 w-40 sm:w-auto truncate">{data.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:mt-0 mt-5">
        <div className={`flex items-center gap-2 ${getTimeColor()}`}>
          <MdAccessTime className="w-5 h-5" />
          <span className="text-lg font-mono font-bold">
            {formatTime(timeLeft)}
          </span>
        </div>
        {timeLeft < 300 && (
          <Badge variant="soft" color="red" size="3">
            <MdErrorOutline className="w-3 h-3" />
            Time Running Out
          </Badge>
        )}
      </div>
      {openBackDialog && (
        <ActionModal
          yesColor="red"
          yesText="Yes, Quit"
          title="Quit Quiz ?"
          description="You want to quit this quiz? Your data will not be saved."
          yes={navigateBack}
          no={() => setOpenBackDialog(false)}
        />
      )}
    </div>
  );
}

export default Header;
