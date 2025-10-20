import { useLoaderData } from "react-router";
import { Tabs } from "@radix-ui/themes";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import TabReview from "./components/TabReview";
import TabSummary from "./components/TabSummary";
import ResultOverview from "./components/ResultOverview";
import QuizResultProvider, { QuizResultStates } from "./context";
import ScrollTop from "@components/app/ScrollTop";

function layout() {
  return (
    <QuizResultProvider>
      <Content />
    </QuizResultProvider>
  );
}

function Content() {
  const { setData, data } = useContext(QuizResultStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  if (!data.quiz) {
    return;
  }

  return (
    <div className="max-w-4xls mx-auto space-y-6">
      <ScrollTop/>
      <Header />
      <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl">
        <div className="p-4 sm:p-8">
          <ResultOverview />
        </div>
      </div>
      <Tabs.Root defaultValue="summary" className="space-y-6">
        <Tabs.List className="grid w-full grid-cols-2">
          <Tabs.Trigger value="summary">Summary</Tabs.Trigger>
          <Tabs.Trigger value="review">Question Review</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="summary" className="space-y-6 ">
          <TabSummary />
        </Tabs.Content>
        <Tabs.Content value="review" className="space-y-6">
          <TabReview />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default layout;
