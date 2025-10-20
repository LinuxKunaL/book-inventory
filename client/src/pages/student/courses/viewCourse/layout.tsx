import { useLoaderData } from "react-router";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import Resources from "./components/Resources";
import LessonDataProvider from "./components/context";
import CourseContent from "./components/CourseContent";
import VideoAndDescription from "./components/VideoAndDescription";
import CoursesViewProvider, { CoursesViewStates } from "./context";

function layout() {
  return (
    <CoursesViewProvider>
      <Content />
    </CoursesViewProvider>
  );
}

function Content() {
  const { setData } = useContext(CoursesViewStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData(loaderResult);
  }, [loaderResult]);

  return (
    <main className="flex-1 lg:ml-0">
      <div className="p-0 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <LessonDataProvider>
            <Header />
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <VideoAndDescription />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <CourseContent />
                <Resources />
              </div>
            </div>
          </LessonDataProvider>
        </div>
      </div>
    </main>
  );
}

export default layout;
