import { schoolRegisterService } from "@services/school.service";
import { AxiosError } from "axios";
import { useState } from "react";

function useSchoolRegister() {
  const [loading, setLoading] = useState(false);

  const registerSchool = async (data: any) => {
    try {
      setLoading(true);
      const result = await schoolRegisterService(data);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setLoading(true);
        throw error.response;
      }
    } finally {
      setLoading(false);
    }
  };

  return { registerSchool, loading };
}

export default useSchoolRegister;
