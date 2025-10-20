import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import Input from "@components/interfaces/Input";
import { useLocation, useNavigate, useSearchParams } from "react-router";


type FilterProps = {
  search: string;
  class: string;
  section: string;
  school: string;
};

function Filter() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FilterProps>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isFilterClick, setIsFilterClick] = useState(false);
  const [_, setSearchParams] = useSearchParams();

  const handleFilter = async (params: FilterProps) => {
    setIsFilterClick(true);

    const cleanedData = Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, v ?? ""])
    );

    setSearchParams({ page: "1", ...cleanedData });
  };

  const handleClearFilter = () => {
    reset({
      search: "",
      class: "",
      section: "",
      school: "",
    });
    if (isFilterClick) {
      navigate(`${pathname}?page=1`);
    }
    setIsFilterClick(false);
  };

  return (
    <div className="sm:pt-6">
      <form
        className="flex flex-col lg:flex-row gap-4 items-center justify-between"
        onSubmit={handleSubmit(handleFilter)}
      >
        <div className="flex gap-4 flex-col sm:flex-row w-full flex-wrap">
          <Input
            size="3"
            icon={MdSearch}
            radius="medium"
            BgColor="bg-gray-800"
            {...register("search")}
            placeholder="Search by location..."
          />
        </div>
        {isDirty && (
          <div className="flex gap-4 sm:self-auto self-end">
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
