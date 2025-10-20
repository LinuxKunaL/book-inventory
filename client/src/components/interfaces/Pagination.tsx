import { IconButton } from "@radix-ui/themes";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import type { SetURLSearchParams } from "react-router";

type Props = {
  page: URLSearchParams;
  setPage: SetURLSearchParams;
  length: number;
};

function Pagination(props: Props) {
  const page = Number(props.page.get("page")) || 1;
  const remainOldParams = Object.fromEntries(props.page.entries());

  const numberLength = Math.ceil(props.length / 10);

  const handleForward = () => {
    if (page < Math.ceil(props.length / 10)) {
      props.setPage({ ...remainOldParams, page: (page + 1).toString() });
    }
  };

  const handleBackward = () => {
    if (page > 1) {
      props.setPage({ ...remainOldParams, page: (page - 1).toString() });
    }
  };

  if (props.length == 0) {
    return null;
  }

  return (
    <div className="flex justify-start gap-2">
      <IconButton
        onClick={handleBackward}
        disabled={page === 1}
        variant="surface"
        radius="medium"
      >
        <MdArrowBack />
      </IconButton>
      {Array.from({ length: numberLength }).map((_, i) => (
        <IconButton
          key={i}
          variant={i + 1 === page ? "solid" : "soft"}
          radius="medium"
          onClick={() =>
            props.setPage({ ...remainOldParams, page: (i + 1).toString() })
          }
        >
          {i + 1}
        </IconButton>
      ))}
      <IconButton
        disabled={page === numberLength}
        onClick={handleForward}
        radius="medium"
        variant="surface"
      >
        <MdArrowForward />
      </IconButton>
    </div>
  );
}

export default Pagination;
