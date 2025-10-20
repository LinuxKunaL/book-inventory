import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdFacebook } from "react-icons/md";

function FollowUs() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Follow Us
      </h2>
      <div className="text-center mb-8">
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay connected with FinTeen on social media for the latest updates,
          financial tips, and educational content designed specifically for
          teens.
        </p>
      </div>
      <div className="flex justify-center space-x-6">
        <a
          href="https://facebook.com/finteen"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <MdFacebook size={24} color="white" />
        </a>
        <a
          href="https://twitter.com/finteen"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <FaXTwitter size={24} className="text-white dark:text-black"/>
        </a>
        <a
          href="https://instagram.com/finteen"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <FaInstagram size={24} color="white" />
        </a>
        <a
          href="https://linkedin.com/company/finteen"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-700 hover:bg-blue-800 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <FaLinkedin size={24} color="white" />
        </a>
        <a
          href="https://youtube.com/finteen"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <FaYoutube size={24} color="white" />
        </a>
      </div>
    </section>
  );
}

export default FollowUs;
