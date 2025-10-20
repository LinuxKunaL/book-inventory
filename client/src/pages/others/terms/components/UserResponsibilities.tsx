import { MdSupervisedUserCircle } from "react-icons/md";

function UserResponsibilities() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <MdSupervisedUserCircle
          size={32}
          className="text-crimson-500 dark:text-crimson-400"
        />
        User Responsibilities
      </h2>
      <div className="space-y-6">
        <div className=" shadow-2xs p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Account Security
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            You are responsible for maintaining the security of your account and
            password. You must notify us immediately of any unauthorized use of
            your account.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Keep your login credentials confidential</li>
            <li>• Use a strong, unique password</li>
            <li>• Enable two-factor authentication when available</li>
            <li>• Report suspicious account activity immediately</li>
            <li>• Log out from shared or public devices</li>
          </ul>
        </div>
        <div className=" shadow-2xs p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Acceptable Use
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            You agree to use our platform only for lawful purposes and in
            accordance with these Terms. Prohibited activities include but are
            not limited to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Sharing inappropriate or offensive content</li>
            <li>• Attempting to hack or compromise platform security</li>
            <li>• Impersonating other users or entities</li>
            <li>• Distributing malware or harmful code</li>
            <li>• Violating intellectual property rights</li>
            <li>• Engaging in harassment or bullying</li>
          </ul>
        </div>
        <div className=" shadow-2xs p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700/50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Age Requirements
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            Our platform is designed for teenagers aged 13-18. Special
            requirements apply for different age groups:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Ages 13-15
              </h5>
              <ul className="space-y-1 text-gray-700 dark:text-gray-400 text-sm">
                <li>• Parental consent required</li>
                <li>• Limited data collection</li>
                <li>• Enhanced privacy protections</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Ages 16-18
              </h5>
              <ul className="space-y-1 text-gray-700 dark:text-gray-400 text-sm">
                <li>• Independent account creation</li>
                <li>• Full platform access</li>
                <li>• Optional parental oversight</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserResponsibilities;
