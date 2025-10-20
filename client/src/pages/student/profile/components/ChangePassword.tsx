import InputControlled from "@components/interfaces/Controlled/InputControlled";
import { toast } from "@functions/toast/toast";
import useStudentAuth from "@hooks/api/auth/useStudent.auth";
import { Button } from "@radix-ui/themes";
import { RegExpPatterns } from "@utils/regExpPatten";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { MdLock } from "react-icons/md";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { loading, updatePassword } = useStudentAuth();

  const onSubmit = (data: any) => {
    if (data.currentPassword === data.newPassword) {
      toast.error("New password cannot be same as current password");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.processing(updatePassword(data), {
      loadingText: "Updating password...",
      successText: () => {
        reset();
        return "Password updated successfully";
      },
      errorText: (error) => {
        return error.data.error || "Failed to update password";
      },
    });
  };

  return (
    <div className=" shadow-sm p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mt-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
        Change Password
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Update your Password
      </p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <InputControlled
            isRequired
            icon={MdLock}
            secondIconButton={
              <div className="cursor-pointer">
                <FaEye size={16} className="hover:text-gray-50" />
              </div>
            }
            errors={errors}
            register={register}
            name="currentPassword"
            errorMessage="Current password is required"
            placeholder="Enter your current password"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <InputControlled
            isRequired
            icon={MdLock}
            secondIconButton={
              <div className="cursor-pointer">
                <FaEye size={16} className="hover:text-gray-50" />
              </div>
            }
            errors={errors}
            register={register}
            name="newPassword"
            errorMessage="New password is required"
            placeholder="Enter your new password"
            patternValidation={{
              value: RegExpPatterns.password,
              message:
                "Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters",
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="confirmPassword"
          >
            Retype new Password
          </label>
          <InputControlled
            isRequired
            icon={MdLock}
            secondIconButton={
              <div className="cursor-pointer">
                <FaEye size={16} className="hover:text-gray-50" />
              </div>
            }
            errors={errors}
            register={register}
            name="confirmPassword"
            errorMessage="Confirm password is required"
            placeholder="Enter your new password"
            patternValidation={{
              value: RegExpPatterns.password,
              message:
                "Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters",
            }}
          />
        </div>
        <Button disabled={loading} size="3" radius="medium">
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
