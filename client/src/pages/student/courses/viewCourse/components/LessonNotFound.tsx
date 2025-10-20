import { MdOutlineVideocamOff } from "react-icons/md";

function LessonNotFound() {
  return (
    <div className=" shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden h-64 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl">
        <div className="flex-shrink-0">
          <div className="w-36 h-20 md:w-48 md:h-30 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-center shadow-inner animate-[pulse_2s_infinite]">
            <MdOutlineVideocamOff
              size={48}
              className="text-gray-300 dark:text-gray-600"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
            No lesson found
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
            We couldn't find a recorded video for the current lesson. You can
            start the lesson from 'Course Content' section.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LessonNotFound;
