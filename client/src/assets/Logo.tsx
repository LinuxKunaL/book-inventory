import clsx from "clsx";
import { Link } from "react-router";

function Logo({ from }: { from?: string }) {
  return (
    <div className={clsx(from == "home" ? "block" : "sm:block hidden")}>
      <Link to="/">
        <span className="font-semibold text-gray-700 dark:text-white transition-all duration-300 text-2xl">
          📚 Inventory
        </span>
      </Link>
    </div>
  );
}

export default Logo;
