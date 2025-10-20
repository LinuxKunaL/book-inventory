import { MdSupervisedUserCircle } from "react-icons/md";

function HowWeUse() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <MdSupervisedUserCircle size={32} className="text-crimson-500 dark:text-crimson-400"/>
        How We Use Your Information
      </h2>
      <div className="space-y-6">
        <div className=" shadow-2xs p-6 bg-gradient-to-r from-blue-50 to-crimson-50 dark:from-blue-900/20 dark:to-crimson-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Educational Services
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            We use your information to provide personalized financial literacy
            education, track your learning progress, and recommend appropriate
            content based on your skill level and interests.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Customize learning paths and recommendations</li>
            <li>• Track progress and generate achievement certificates</li>
            <li>• Provide feedback on quizzes and assessments</li>
            <li>• Enable communication with instructors and peers</li>
          </ul>
        </div>
        <div className=" shadow-2xs p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-700/50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Platform Improvement
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            We analyze usage patterns to improve our platform, develop new
            features, and ensure the best possible learning experience for all
            users.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Analyze learning effectiveness and engagement</li>
            <li>• Identify and fix technical issues</li>
            <li>• Develop new educational content and features</li>
            <li>• Conduct research on financial literacy education</li>
          </ul>
        </div>
        <div className=" shadow-2xs p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700/50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Communication
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            We may use your contact information to send important updates,
            educational newsletters, and respond to your inquiries.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Send course updates and new content notifications</li>
            <li>• Provide customer support and technical assistance</li>
            <li>• Share educational newsletters and tips</li>
            <li>• Notify about platform changes or policy updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowWeUse;
