import { BsExclamationCircle } from "react-icons/bs";
import { MdOutlineShield } from "react-icons/md";

function LimitationsOfLiability() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <MdOutlineShield
          size={32}
          className="text-crimson-500 dark:text-crimson-400"
        />
        Limitations of Liability
      </h2>
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <BsExclamationCircle
              size={20}
              className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
            />
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Educational Purpose Only
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                FinTeen provides educational content for informational purposes
                only. Our content should not be considered as professional
                financial advice. Always consult with qualified financial
                advisors for specific financial decisions.
              </p>
            </div>
          </div>
        </div>
        <div className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Service Availability
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            While we strive to maintain continuous service availability, we
            cannot guarantee uninterrupted access to our platform. We are not
            liable for:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Temporary service outages or maintenance downtime</li>
            <li>• Technical issues beyond our reasonable control</li>
            <li>• Internet connectivity problems</li>
            <li>• Third-party service interruptions</li>
            <li>• Force majeure events</li>
          </ul>
        </div>
        <div className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Limitation of Damages
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            To the maximum extent permitted by law, FinTeen shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages, including but not limited to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Loss of profits or revenue</li>
            <li>• Loss of data or information</li>
            <li>• Business interruption</li>
            <li>• Loss of educational opportunities</li>
            <li>• Emotional distress or other intangible losses</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LimitationsOfLiability;
