function Faq() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        <div
          className=" shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
          data-v0-t="card"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            How quickly will I receive a response?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We aim to respond to all inquiries within 24 hours during business
            days. For urgent technical issues, we typically respond within 2-4
            hours.
          </p>
        </div>
        <div
          className=" shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
          data-v0-t="card"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Can I schedule a demo or consultation?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Yes! We offer personalized demos for schools and organizations.
            Contact us at schools@finteen.com to schedule a consultation with
            our education specialists.
          </p>
        </div>
        <div
          className=" shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
          data-v0-t="card"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Do you offer phone support?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Phone support is available during business hours (9 AM - 5 PM PST,
            Monday-Friday) for urgent issues. For general inquiries, email
            support typically provides faster and more detailed responses.
          </p>
        </div>
        <div
          className=" shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
          data-v0-t="card"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            How can parents get involved?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Parents can create oversight accounts to monitor their teen's
            progress, access parent resources, and receive regular updates.
            Contact parents@finteen.com for more information about parental
            features.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Faq;
