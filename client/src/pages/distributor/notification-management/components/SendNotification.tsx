import { useForm } from "react-hook-form";
import { Button, Switch } from "@radix-ui/themes";
import { toast } from "@functions/toast/toast";
import Modal from "@components/interfaces/Modal";
import { emitNotification } from "@servicesSocket/handler/admin.handler";
import { MdClose, MdLink, MdQuiz, MdSend, MdVideocam } from "react-icons/md";
import SelectControlled from "@components/interfaces/Controlled/SelectControlled";
import InputControlled from "@components/interfaces/Controlled/InputControlled";
import TextAreaControlled from "@components/interfaces/Controlled/TextAreaControlled";
import { useRevalidator } from "react-router";
import { getSchoolsService } from "@services/admin.service";
import { useState } from "react";
import {
  classStandardDataSelect,
  sectionDataSelect,
} from "@utils/classStandardData";

type Props = {
  setOpen: (open: boolean) => void;
};

type TOption = {
  value: string;
  label: string;
};

function SendNotification({ setOpen }: Props) {
  const {
    watch,
    reset,
    register,
    control,
    unregister,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  const { revalidate } = useRevalidator();
  const [optionSchools, setOptionSchools] = useState<TOption[]>([]);
  const [isPrivateNotification, setIsPrivateNotification] = useState(false);

  const handleSendNotification = (params: any) => {
    emitNotification(params);
    setOpen(false);
    toast.success("Notification sent successfully!");
    revalidate();
  };

  const notificationsOptions = [
    { value: "Announcement", label: "Announcement" },
    { value: "Meeting Link", label: "Meeting Link" },
    { value: "Live Class", label: "Live Class" },
    { value: "New Course", label: "New Course Added" },
    { value: "New Quiz", label: "New Quiz" },
  ];

  const getSchoolsOptions = async (value: boolean) => {
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

  const handlePrivetCheck = (checked: boolean) => {
    setIsPrivateNotification(checked);
    if (!checked) {
      reset({
        private: {
          school: "",
          classStandard: "",
          section: "",
        },
      });
      unregister("private");
    }
  };

  return (
    <Modal open={true} size="3">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium text-xl text-gray-900 dark:text-white">
              Send Notification
            </h3>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Choose the type of notification to send.
          </div>
        </div>
        <MdClose onClick={() => setOpen(false)} cursor={"pointer"} size={20} />
      </div>
      <form
        className="space-y-4 mt-4"
        onSubmit={handleSubmit(handleSendNotification)}
      >
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Notification Type
            </label>
            <SelectControlled
              name="type"
              errors={errors}
              control={control}
              isRequired={true}
              className="!w-full"
              options={notificationsOptions}
              errorMessage="Please select a notification type"
              placeholder="Select Notification Type"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Send Private Notification
            </label>
            <Switch
              className="!mt-3"
              defaultChecked={false}
              onCheckedChange={handlePrivetCheck}
            />
          </div>
        </div>
        {isPrivateNotification && (
          <>
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                School
              </label>
              <SelectControlled
                isRequired={true}
                errors={errors}
                control={control}
                name="private.school"
                className="!w-full"
                options={optionSchools}
                placeholder="Select School"
                onOpenChange={getSchoolsOptions}
                errorMessage="Please select a school"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Class Standard
                </label>
                <SelectControlled
                  name="private.classStandard"
                  errors={errors}
                  control={control}
                  className="!w-full"
                  options={classStandardDataSelect}
                  placeholder="Select Class Standard"
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Class Section
                </label>
                <SelectControlled
                  name="private.section"
                  errors={errors}
                  control={control}
                  options={sectionDataSelect}
                  className="!w-full"
                  placeholder="Select Class Section"
                />
              </div>
            </div>
          </>
        )}
        {watch("type") === "Meeting Link" && (
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Meeting Link
            </label>
            <div className="relative">
              <InputControlled
                name="link"
                icon={MdLink}
                errors={errors}
                register={register}
                isRequired={true}
                placeholder="https://meet.google.com/..."
                errorMessage="Meeting link is required"
              />
            </div>
          </div>
        )}
        {watch("type") === "New Course" && (
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Course title
            </label>
            <div className="relative">
              <InputControlled
                icon={MdVideocam}
                errors={errors}
                name="course"
                isRequired={true}
                register={register}
                placeholder="Enter course title"
                errorMessage="Course title is required"
              />
            </div>
          </div>
        )}
        {watch("type") === "New Quiz" && (
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Quiz title
            </label>
            <div className="relative">
              <InputControlled
                icon={MdQuiz}
                errors={errors}
                name="quiz"
                isRequired={true}
                register={register}
                placeholder="Enter quiz title"
                errorMessage="Quiz title is required"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Message
          </label>
          <TextAreaControlled
            name="message"
            errors={errors}
            isRequired={true}
            register={register}
            errorMessage="Message is required"
            placeholder="Type your message here..."
          />
        </div>

        <Button
          size="3"
          type="submit"
          radius="medium"
          disabled={!isDirty}
          className="!w-full"
        >
          <MdSend className="w-4 h-4 mr-2" />
          Send Notification
        </Button>
      </form>
    </Modal>
  );
}

export default SendNotification;
