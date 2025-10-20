import SelectControlled from "@components/interfaces/Controlled/SelectControlled";
import Input from "@components/interfaces/Input";
import { Button } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { toast } from "@functions/toast/toast";
import { QuizzesBrowseStates } from "../context";

type FilterProps = {
  search: string;
  difficulty: string;
  category: string;
};

function Filter() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<FilterProps>();
  const {
    data: { totalQuizzes },
  } = useContext(QuizzesBrowseStates);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const [isFilterClick, setIsFilterClick] = useState(false);

  const optionsDifficulty = [
    {
      value: "Beginner",
      label: "Beginner",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
    },
    {
      value: "Advanced",
      label: "Advanced",
    },
  ];

  const handleFilter = async (params: FilterProps) => {
    if (totalQuizzes === 0) {
      toast.info("No quizzes found");
      return;
    }

    setIsFilterClick(true);

    const cleanedData = Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, v ?? ""])
    );

    setSearchParams({ page: "1", ...cleanedData });
  };

  const handleClearFilter = () => {
    reset({
      search: "",
      difficulty: "",
      category: "",
    });
    if (isFilterClick) navigate(`${pathname}?page=1`);
    setIsFilterClick(false);
  };

  return (
    <div className="sm:pt-6 sm:pb-6">
      <form
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
        onSubmit={handleSubmit(handleFilter)}
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Input
            size="3"
            radius="medium"
            BgColor="bg-gray-800"
            icon={MdSearch}
            {...register("search")}
            placeholder="Search by quiz name..."
          />
          <SelectControlled
            name="difficulty"
            control={control}
            options={optionsDifficulty}
            placeholder="All difficulty"
          />
        </div>
        {isDirty && (
          <div className="flex gap-4 sm:self-start self-end">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleClearFilter();
              }}
              variant="soft"
              color="gray"
              radius="medium"
              size="3"
            >
              Clear
            </Button>
            <Button variant="solid" radius="medium" size="3">
              Filter
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Filter;
