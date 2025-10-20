function Header() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Orders Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage all Orders
        </p>
      </div>
    </div>
  );
}

export default Header;
