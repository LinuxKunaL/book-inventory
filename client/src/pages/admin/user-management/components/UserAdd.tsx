import { useForm } from "react-hook-form";
import { UserStates } from "../context";
import { MdClose } from "react-icons/md";
import type { TStudentData } from "./type";
import { useRevalidator } from "react-router";
import { toast } from "@functions/toast/toast";
import Modal from "@components/interfaces/Modal";
import { Button, ScrollArea } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import useStudentApi from "@hooks/api/admin/useStudent.api";
import { getSchoolsService } from "@services/admin.service";
import {
  classStandardDataSelect,
  sectionDataSelect,
} from "@utils/classStandardData";
import InputControlled from "@components/interfaces/Controlled/InputControlled";
import SelectControlled from "@components/interfaces/Controlled/SelectControlled";
import { genders, roles } from "@data/selectOptions";
import type { TUser } from "@types_/user";
import api from "@servicesOther/axios.api";

type TOption = {
  value: string;
  label: string;
};

function StudentAdd() {
  const { setIsAddModalOpen, isAddModalOpen } = useContext(UserStates);
  const { createStudent, loading, updateStudent } = useStudentApi();
  const [optionSchools, setOptionSchools] = useState<TOption[]>([]);
  const { revalidate } = useRevalidator();
  const isEdit = isAddModalOpen.editData.fullname;

  const {
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    if (isEdit) {
      reset(isAddModalOpen.editData);
      // setValue("school", isAddModalOpen.editData.school?._id);
    }
  }, []);

  const submitFrom = async (params: any) => {
    toast.processing(api.post("/admin/addUser", params), {
      loadingText: "Adding User..",
      successText: () => {
        revalidate();
        setIsAddModalOpen({ isOpen: false, editData: {} as TUser });
        return "user added successfully";
      },
      errorText: (response) => response.data.error,
    });
  };

  const getLocationsOptions = async (value: boolean) => {
    if (value && optionSchools.length === 0) {
      const result = await getSchoolsService(undefined, "plain");
      if (result.schools.length === 0) {
        return setOptionSchools([{ value: "-1", label: "Schools not found" }]);
      }
      const options = result.schools.map((item: any) => ({
        value: item._id,
        label: item.schoolName,
      }));
      setOptionSchools(options);
    }
  };

  return (
    <Modal open={true} className="!max-w-[45pc]" size="1">
      <ScrollArea type="hover" scrollbars="vertical">
        <form
          className="space-y-3 sm:space-y-6 p-2 sm:p-5"
          onSubmit={handleSubmit(submitFrom)}
        >
          <div className="mb-4 sm:mb-6 flex justify-between">
            <div>
              <h3 className="font-semibold tracking-tight text-xl">
                {isEdit ? "Edit" : "Add new"} user
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Please fill in the form below to {isEdit ? "edit" : "add a new"}{" "}
                user
              </p>
            </div>
            <MdClose
              onClick={() =>
                setIsAddModalOpen(({ isOpen }) => ({
                  isOpen: !isOpen,
                  editData: {} as TUser,
                }))
              }
              className="cursor-pointer"
              size={20}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullname"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full name <span className="text-red-500">*</span>
              </label>
              <InputControlled
                isRequired
                errors={errors}
                register={register}
                name="fullname"
                placeholder="Enter fullname"
                errorMessage="full name is required"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <InputControlled
                isRequired
                errors={errors}
                register={register}
                name="email"
                placeholder="Enter email address"
                errorMessage="email is required"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <InputControlled
                isRequired
                name="password"
                errors={errors}
                register={register}
                errorMessage="password is required"
                placeholder="Enter password"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <SelectControlled
                isRequired
                control={control}
                name="role"
                errors={errors}
                options={roles}
                placeholder="Select role"
                errorMessage="role is required"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="gender"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Gender <span className="text-red-500">*</span>
              </label>
              <SelectControlled
                isRequired
                control={control}
                name="gender"
                errors={errors}
                options={genders}
                placeholder="Select gender"
                errorMessage="Gender is required"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Location <span className="text-red-500">*</span>
              </label>
              {/* <SelectControlled
                isRequired
                name="location"
                errors={errors}
                control={control}
                options={classStandardDataSelect}
                placeholder="Select location"
                errorMessage="location is required"
              /> */}
              <InputControlled
                isRequired
                name="location"
                errors={errors}
                register={register}
                errorMessage="location is required"
                placeholder="Enter location"
              />
            </div>
            {/* <div className="flex flex-col gap-1">
              <label
                htmlFor="assignedProprietor"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Assigned Proprietor <span className="text-red-500">*</span>
              </label>
              <SelectControlled
                isRequired
                name="assignedProprietor"
                errors={errors}
                control={control}
                options={sectionDataSelect}
                errorMessage="proprietor is required"
                placeholder="Assign proprietor"
              />
            </div> */}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() =>
                setIsAddModalOpen({
                  isOpen: false,
                  editData: {} as TUser,
                })
              }
              variant="soft"
              size="3"
              radius="medium"
              color="gray"
              disabled={loading}
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="solid"
              size="3"
              radius="medium"
            >
              {isEdit ? "Update" : "Add"} User
            </Button>
          </div>
        </form>
      </ScrollArea>
    </Modal>
  );
}

export default StudentAdd;
