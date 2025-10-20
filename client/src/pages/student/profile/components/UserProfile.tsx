import { toast } from "@functions/toast/toast";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";
import { RegExpPatterns } from "@utils/regExpPatten";
import { useContext, useEffect, useState } from "react";
import { StudentMeStates } from "@pages/student/context";
import useStudentAuth from "@hooks/api/auth/useStudent.auth";
import { MdLock, MdOutlineMailOutline, MdPhone } from "react-icons/md";
import InputControlled from "@components/interfaces/Controlled/InputControlled";

function UserProfile() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { student } = useContext(StudentMeStates);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [otpIsSend, setOtpIsSend] = useState(false);
  const { loading, requestOtp, updateStudent } = useStudentAuth();

  useEffect(() => {
    reset({
      admissionNumber: student?.admissionNumber,
      studentName: student?.studentName,
      email: student?.email,
      mobileNumber: student?.mobileNumber,
    });
  }, [student]);

  const onSubmit = (data: any) => {
    const forOtp = {
      admissionNumber: data.admissionNumber,
      mobileNumber: data.mobileNumber,
      fromProfile: true,
    };

    if (otpIsSend) {
      if (!data.otp) {
        toast.error("Please enter OTP");
      }
      toast.processing(updateStudent(data), {
        loadingText: "Updating profile...",
        successText: () => {
          setIsProfileEdit(false);
          setOtpIsSend(false);
          return "Profile updated successfully";
        },
        errorText: (error) => {
          return error.data.error || "Failed to update profile";
        },
      });
      return;
    }

    toast.processing(requestOtp(forOtp), {
      loadingText: "OTP sending...",
      successText: () => {
        setOtpIsSend(true);
        return "OTP sent successfully";
      },
      errorText: (error) => {
        return error.data.error || "Failed to send OTP";
      },
    });
  };

  return (
    <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          User Profile
        </h2>
        <Button
          radius="medium"
          size="3"
          variant="surface"
          onClick={() => setIsProfileEdit(!isProfileEdit)}
        >
          {isProfileEdit ? "Cancel" : "Edit Profile"}
        </Button>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 sm:block hidden">
        Update your profile information
      </p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="fullName"
          >
            Full name
          </label>
          <InputControlled
            isRequired
            icon={FaRegUserCircle}
            errors={errors}
            register={register}
            name="studentName"
            disabled={!isProfileEdit}
            errorMessage="Name is required"
            placeholder="Enter you student name"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="phone"
          >
            Number
          </label>
          <InputControlled
            isRequired
            icon={MdPhone}
            type="number"
            errors={errors}
            patternValidation={{
              value: RegExpPatterns.mobileNumber,
              message: "Mobile number is not valid",
            }}
            register={register}
            name="mobileNumber"
            disabled={!isProfileEdit}
            errorMessage="Phone number is required"
            placeholder="Enter you phone number"
          />
        </div>
        {otpIsSend && (
          <div className="flex justify-between items-end gap-6">
            <div className="flex flex-col gap-3 flex-1">
              <label
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="phone"
              >
                OTP
              </label>
              <InputControlled
                name="otp"
                isRequired
                icon={MdLock}
                errors={errors}
                register={register}
                placeholder="Enter your otp"
              />
            </div>
            <Button disabled={loading} radius="medium" size="3">
              Verify Otp
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="email"
          >
            Email
          </label>

          <InputControlled
            isRequired
            icon={MdOutlineMailOutline}
            errors={errors}
            register={register}
            name="email"
            disabled={!isProfileEdit}
            errorMessage="email is required"
            placeholder="Enter you email"
          />
        </div>
        {isProfileEdit && (
          <Button disabled={loading} radius="medium" size="3" variant="solid">
            Save Changes
          </Button>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
