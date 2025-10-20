import { FaRegClock } from "react-icons/fa";

function AccountTermination() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <FaRegClock size={32} className="text-crimson-500 dark:text-crimson-400" />
        Account Termination
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
          data-v0-t="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Termination by You
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            You may terminate your account at any time by contacting our support
            team or using the account deletion feature in your profile settings.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Download your data before deletion</li>
            <li>• Cancel any active subscriptions</li>
            <li>• Account deletion is permanent</li>
            <li>• Some data may be retained for legal compliance</li>
          </ul>
        </div>
        <div
          className=" shadow-2xs p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
          data-v0-t="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Termination by FinTeen
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            We may suspend or terminate your account if you violate these Terms
            or engage in activities that harm our platform or other users.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
            <li>• Warning system for minor violations</li>
            <li>• Immediate termination for serious breaches</li>
            <li>• Appeal process available</li>
            <li>• Refund policy applies to paid services</li>
          </ul>
        </div>
      </div>
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-xl p-6 mt-6">
        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
          Effect of Termination
        </h4>
        <p className="text-red-700 dark:text-red-300 text-sm">
          Upon termination, your right to use the platform ceases immediately.
          Provisions regarding intellectual property, limitation of liability,
          and dispute resolution survive termination.
        </p>
      </div>
    </section>
  );
}

export default AccountTermination;
