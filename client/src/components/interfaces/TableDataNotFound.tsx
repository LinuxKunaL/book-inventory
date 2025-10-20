type Props = { length: number; title: string };

function TableDataNotFound({ length, title }: Props) {
  if (length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] p-3 dark:bg-gray-800 border-[1px] border-gray-200 dark:border-gray-700 bg-white rounded-xl">
        <h3 className="text-gray-600 dark:text-gray-300 text-lg">{title}</h3>
      </div>
    );
  } else {
    return null;
  }
}

export default TableDataNotFound;
