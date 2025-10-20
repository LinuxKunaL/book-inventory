import { useContext } from "react";
import { LessonDataStates } from "./context";
import { MdFilePresent, MdOutlineFileDownload } from "react-icons/md";

function Resources() {
  const { currentLesson } = useContext(LessonDataStates);
  const handleDownload = (filename: string) => {
    window.open(
      `${
        import.meta.env.VITE_API_URL
      }/api/other/uploads?type=resource&filename=${filename}`,
      "_blank"
    );
  };

  return (
    <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
        Resources
      </h3>
      {(currentLesson.resources?.length === 0 || !currentLesson.resources) && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No resources found
        </p>
      )}
      <div className="space-y-3">
        {currentLesson.resources?.map((resource) => (
          <div
            className="w-full flex items-center gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => handleDownload(resource.name as string)}
          >
            <MdFilePresent
              className="text-gray-600 dark:text-gray-400"
              size={24}
            />
            <div className="flex-1 w-5 text-left">
              <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                {resource.name as string}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {resource.size}
              </p>
            </div>
            <MdOutlineFileDownload size={20} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
