import { MdDocumentScanner } from "react-icons/md";

function YourPrivacyRights() {
  return (
    <div className="sm:mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <MdDocumentScanner
          size={32}
          className="text-crimson-500 dark:text-crimson-400"
        />
        Your Privacy Rights
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200"
          data-v0-t="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Access &amp; Portability
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            You have the right to access your personal data and receive a copy
            in a portable format.
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <li>• Request a copy of your data</li>
            <li>• Download your learning progress</li>
            <li>• Export your profile information</li>
          </ul>
        </div>
        <div
          className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200"
          data-v0-t="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Correction &amp; Deletion
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            You can update incorrect information or request deletion of your
            personal data.
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <li>• Update profile information</li>
            <li>• Correct inaccurate data</li>
            <li>• Request account deletion</li>
          </ul>
        </div>
        <div
          className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200"
          data-v0-t="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Consent Management
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            You can withdraw consent for data processing activities at any time.
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <li>• Withdraw marketing consent</li>
            <li>• Opt out of analytics</li>
            <li>• Manage cookie preferences</li>
          </ul>
        </div>
        <div
          className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200"
          data-v0-t="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Restriction &amp; Objection
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            You can restrict or object to certain types of data processing.
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <li>• Limit data processing</li>
            <li>• Object to profiling</li>
            <li>• Restrict automated decisions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default YourPrivacyRights;
