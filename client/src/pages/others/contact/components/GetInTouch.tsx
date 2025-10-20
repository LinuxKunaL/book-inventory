import {
  MdCall,
  MdWhatsapp,
  MdOutlineSchedule,
  MdOutlineMailOutline,
} from "react-icons/md";

function GetInTouch() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Get in Touch
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div
          className="bg-card  shadow-sm p-6 bg-gradient-to-br from-blue-50 to-crimson-50 dark:from-blue-900/20 dark:to-crimson-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl hover:shadow-lg transition-all duration-200 group"
          data-v0-t="card"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 dark:bg-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <MdOutlineMailOutline size={24} color="white"/>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Email Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Get help via email
            </p>
            <a
              href="mailto:support@finteen.com"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
            >
              support@finteen.com
            </a>
          </div>
        </div>
        <div
          className="bg-card  shadow-sm p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/50 rounded-xl hover:shadow-lg transition-all duration-200 group"
          data-v0-t="card"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 dark:bg-green-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <MdWhatsapp size={24} color="white"/>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Whatsapp Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Reach us directly
            </p>
            <a
              href="tel:+15551234567"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium transition-colors duration-200"
            >
              Open Chat
            </a>
          </div>
        </div>
        <div
          className="bg-card  shadow-sm p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700/50 rounded-xl hover:shadow-lg transition-all duration-200 group"
          data-v0-t="card"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 dark:bg-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <MdCall size={24} color="white"/>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Call Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Call us directly
            </p>
            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200">
              +1 (123) 456-7890
            </button>
          </div>
        </div>
        <div
          className="bg-card  shadow-sm p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700/50 rounded-xl hover:shadow-lg transition-all duration-200 group"
          data-v0-t="card"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 dark:bg-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <MdOutlineSchedule size={24} color="white"/>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Office Hours
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Mon-Fri, 9 AM - 5 PM PST
            </p>
            <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">
              Response within 24h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetInTouch;
