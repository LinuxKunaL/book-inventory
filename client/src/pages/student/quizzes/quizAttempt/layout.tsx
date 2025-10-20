import { useContext, useEffect } from "react";
import QuizAttemptProvider, { QuizAttemptStates } from "./context";
import { useLoaderData } from "react-router";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import QuestionsView from "./components/QuestionsView";
import Modal from "@components/interfaces/Modal";
import SubmitQuiz from "./components/SubmitQuiz";



function layout() {
  return (
    <QuizAttemptProvider>
      <Content />
    </QuizAttemptProvider>
  );
}

function Content() {
  const { setData, showSubmitDialog } = useContext(QuizAttemptStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  return (
    <div className="max-w-4xls mx-auto space-y-6">
      <Header />
      <ProgressBar />
      <QuestionsView />
      <Modal open={showSubmitDialog}>
        <SubmitQuiz />
      </Modal>
    </div>
  );
}

export default layout;
