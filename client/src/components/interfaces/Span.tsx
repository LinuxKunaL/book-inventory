import clsx from "clsx";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

function Span({ children, className }: Props) {
  if (!children) {
    return <span className={clsx("text-gray-400 italic")}>N/A</span>;
  }
  return <span className={clsx(className)}>{children}</span>;
}

export default Span;
