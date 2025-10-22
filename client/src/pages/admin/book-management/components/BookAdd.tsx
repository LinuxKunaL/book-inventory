import { useForm } from "react-hook-form";
import { UserStates } from "../context";
import { MdClose } from "react-icons/md";
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
import { booksCategories, genders, roles } from "@data/selectOptions";
import type { TBook } from "@types_/user";
import api from "@servicesOther/axios.api";

import bookData from "./bookData.json";

type TOption = {
  value: string;
  label: string;
};

function BookAdd() {
  const { setIsAddModalOpen, isAddModalOpen } = useContext(UserStates);
  const { createStudent, loading, updateStudent } = useStudentApi();
  const [optionSchools, setOptionSchools] = useState<TOption[]>([]);
  const { revalidate } = useRevalidator();
  const isEdit = isAddModalOpen.editData.bookName;

  const {
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  register("bookName");
  useEffect(() => {
    if (isEdit) {
      reset(isAddModalOpen.editData);
      const bookValue: any = bookData.find(
        (book: any) => book.label === isAddModalOpen.editData.bookName
      );

console.log(bookValue);

      setValue("bookNameTemp", bookValue?.value);
      // setValue("school", isAddModalOpen.editData.school?._id);
    }
  }, []);

  const submitFrom = async (params: any) => {
    if (isEdit) {
      toast.processing(api.post("/admin/updateBook", params), {
        loadingText: "Adding Book..",
        successText: () => {
          revalidate();
          setIsAddModalOpen({ isOpen: false, editData: {} as TBook });
          return "book added successfully";
        },
        errorText: (response) => response.data.error,
      });
      // window.location.reload();
      return;
    }
    
    if (params.bookNameTemp != "other") {
      setValue("bookName", params.bookNameTemp);
    }
    // const apiCall = isEdit ? updateStudent : createStudent;

    toast.processing(api.post("/admin/addBook", params), {
      loadingText: "Adding Book..",
      successText: () => {
        revalidate();
        setIsAddModalOpen({ isOpen: false, editData: {} as TBook });
        return "book added successfully";
      },
      errorText: (response) => response.data.error,
    });
    window.location.reload();
  };

  const handleBookNameChange = (value: any) => {
    const dataFilter = bookData.find((book: any) => book.value === value);
    if (dataFilter) {
      setValue("bookImage", dataFilter.img);
      setValue("bookName", dataFilter.label);
    }
  };
  const watchBookName = watch("bookNameTemp");
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
                {isEdit ? "Edit" : "Add new"} book
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Please fill in the form below to {isEdit ? "edit" : "add a new"}{" "}
                book
              </p>
            </div>
            <MdClose
              onClick={() =>
                setIsAddModalOpen(({ isOpen }) => ({
                  isOpen: !isOpen,
                  editData: {} as TBook,
                }))
              }
              className="cursor-pointer"
              size={20}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="bookName"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Book Name <span className="text-red-500">*</span>
              </label>
              <SelectControlled
                isRequired
                control={control}
                name="bookNameTemp"
                errors={errors}
                options={[...bookData, { label: "Other", value: "other" }]} // Add "Other" option
                onChange={handleBookNameChange}
                placeholder="Select book name"
                errorMessage="book name is required"
              />
              {/* Conditional input for custom book name */}
              {watchBookName === "other" && (
                <div className="mt-2">
                  <InputControlled
                    isRequired
                    errors={errors}
                    register={register}
                    name="bookName"
                    placeholder="Enter custom book name"
                    errorMessage="custom book name is required"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="bookImage"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Book image <span className="text-red-500">*</span>
              </label>
              <InputControlled
                isRequired
                errors={errors}
                register={register}
                name="bookImage"
                placeholder="Enter book image"
                errorMessage="book image is required"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="basePrice"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Base Price (₹) <span className="text-red-500">*</span>
              </label>
              <InputControlled
                isRequired
                type="number"
                errors={errors}
                register={register}
                name="basePrice"
                placeholder="Enter base price"
                errorMessage="base price is required"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="mrp"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                MRP (₹) <span className="text-red-500">*</span>
              </label>
              <InputControlled
                isRequired
                name="mrp"
                type="number"
                errors={errors}
                register={register}
                errorMessage="mrp is required"
                placeholder="Enter mrp in ₹"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Quantity <span className="text-red-500">*</span>
              </label>
              <InputControlled
                isRequired
                name="quantity"
                errors={errors}
                type="number"
                register={register}
                errorMessage="quantity is required"
                placeholder="Enter quantity"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <SelectControlled
                isRequired
                control={control}
                name="category"
                errors={errors}
                options={booksCategories}
                placeholder="Select category"
                errorMessage="category is required"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() =>
                setIsAddModalOpen({
                  isOpen: false,
                  editData: {} as TBook,
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
              {isEdit ? "Update" : "Add"} Book
            </Button>
          </div>
        </form>
      </ScrollArea>
    </Modal>
  );
}

export default BookAdd;
