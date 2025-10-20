import { BiChevronRight, BiHome } from "react-icons/bi";
import Grids from "@components/others/Grids";
import { Link } from "react-router";

function Head() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mb-8 relative z-10">
            <Link
              to="/"
              className="hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors duration-200 flex gap-1 cursor-pointer"
            >
              <BiHome size={17} />
              Home
            </Link>
            <BiChevronRight size={30} />
            <span className="text-gray-900 dark:text-white font-medium">
              Contact Us
            </span>
          </div>
          <Grids variant="mask" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold dark:text-white text-crimson-500 leading-tight">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our team. We're here to help with any questions
            about FinTeen's financial literacy platform.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sm:px-6 sm:py-3 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
            <div className="size-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: July 1, 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Head;
