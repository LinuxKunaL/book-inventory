import InputControlled from "@components/interfaces/Controlled/InputControlled";
import SelectControlled from "@components/interfaces/Controlled/SelectControlled";
import { toast } from "@functions/toast/toast";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { roles } from "@data/selectOptions";
import api from "@servicesOther/axios.api";

type FormData = {
  username: string;
  password: string;
  role: string;
};

function Auth() {
  // const { loading, adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const submitFrom = async (params: FormData) => {
    const result = await api.post("/auth/login", params);

    if (params.role === "admin") {
      if (result.data.token) {
        toast.success("Admin Login Successful");
        navigate("/admin");
        localStorage.setItem("adminToken", result.data.token);
        localStorage.removeItem("proprietorToken");
      }
    }

    if (params.role === "proprietor") {
      if (result.data.token) {
        toast.success("Proprietor Login Successful");
        navigate("/proprietor");
        localStorage.setItem("proprietorToken", result.data.token);
        localStorage.removeItem("adminToken");
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submitFrom)}>
      <div className="flex gap-2 flex-col">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300">
          User Name: <span className="text-red-500">*</span>
        </label>
        <InputControlled
          isRequired
          name="fullname"
          errors={errors}
          register={register}
          errorMessage="User name is required"
          placeholder="Enter user name"
        />
      </div>
      <div className="flex gap-2 flex-col">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300">
          Email: <span className="text-red-500">*</span>
        </label>
        <InputControlled
          isRequired
          name="email"
          errors={errors}
          type="email"
          register={register}
          errorMessage="email is required"
          placeholder="email password"
        />
      </div>
      <div className="flex gap-2 flex-col">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300">
          password: <span className="text-red-500">*</span>
        </label>
        <InputControlled
          isRequired
          name="password"
          errors={errors}
          type="password"
          register={register}
          errorMessage="password is required"
          placeholder="Enter password"
        />
      </div>
      <div className="flex gap-2 flex-col">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-300">
          Role: <span className="text-red-500">*</span>
        </label>
        <SelectControlled
          control={control}
          isRequired
          name="role"
          errors={errors}
          options={roles}
          errorMessage="role is required"
          placeholder="Select your role"
        />
      </div>
      <Button
        className="!w-full"
        variant="solid"
        radius="medium"
        size="3"
        // disabled={loading}
      >
        Submit
      </Button>
    </form>
  );
}

export default Auth;
