import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@radix-ui/themes";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import SelectControlled from "@components/interfaces/Controlled/SelectControlled";

type FilterProps = {
  type: string;
};

function Filter() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<FilterProps>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isFilterClick, setIsFilterClick] = useState(false);
  const [_, setSearchParams] = useSearchParams();

  const notificationsOptions = [
    { value: "Announcement", label: "Announcement" },
    { value: "Meeting Link", label: "Meeting Link" },
    { value: "Live Class", label: "Live Class" },
    { value: "New Course", label: "New Course Added" },
    { value: "New Quiz", label: "New Quiz" },
  ];

  const handleFilter = async (params: FilterProps) => {
    setIsFilterClick(true);

    const cleanedData = Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, v ?? ""])
    );

    setSearchParams({ page: "1", ...cleanedData });
  };

  const handleClearFilter = () => {
    reset({
      type: "",
    });
    if (isFilterClick) {
      navigate(`${pathname}?page=1`);
    }
    setIsFilterClick(false);
  };

  return (
    <div className="sm:pt-6">
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="flex w-full flex-row gap-4">
          <SelectControlled
            name="type"
            control={control}
            className="sm:!w-[200px] !w-full"
            options={notificationsOptions}
            placeholder="All Type"
          />
        </div>
        {isDirty && (
          <div className="flex gap-4 self-end sm:self-auto">
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
