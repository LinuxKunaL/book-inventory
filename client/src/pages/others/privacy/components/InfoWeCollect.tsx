import { BsExclamationCircle } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";

function InfoWeCollect() {
  return (
    <div className="sm:mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <IoEyeOutline size={32} className="text-crimson-500 dark:text-crimson-400" />
        Information We Collect
      </h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400">
            <li>• Full name and email address</li>
            <li>• Age and grade level</li>
            <li>• School affiliation (if applicable)</li>
            <li>• Parent/guardian contact information</li>
            <li>• Profile preferences and settings</li>
          </ul>
        </div>
        <div className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Usage Information
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400">
            <li>• Course progress and completion data</li>
            <li>• Quiz scores and assessment results</li>
            <li>• Time spent on platform activities</li>
            <li>• Device and browser information</li>
            <li>• IP address and location data</li>
          </ul>
        </div>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <BsExclamationCircle
            size={20}
            className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Special Note for Minors
            </h4>
            <p className="text-yellow-700 dark:text-yellow-400 text-sm">
              For users under 18, we require parental consent before collecting
              any personal information. We comply with COPPA (Children's Online
              Privacy Protection Act) and similar international regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoWeCollect;
