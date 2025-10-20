import { Button } from "@radix-ui/themes";
import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router";

function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          My Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Continue your financial literacy journey
        </p>
      </div>
      <Link to="/dashboard/courses/browse" className="w-fit">
        <Button variant="soft" size="3" radius="medium">
          Browse Courses <MdOpenInNew />
        </Button>
      </Link>
    </div>
  );
}

export default Header;
