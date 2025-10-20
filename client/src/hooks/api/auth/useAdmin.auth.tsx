import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProgress } from "@slice/others/progressLoading";
import { navigateTo } from "@servicesOther/navigationService";
import { adminLoginService } from "@services/auth.service";
import api from "@servicesOther/axios.api";

function useAdminAuth() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const adminLogin = async (data: any) => {
    setLoading(true);
    try {
      const result = await adminLoginService(data);

      if (result.status === "success") {
        localStorage.setItem("token", result.token);
        navigateTo("/admin");
      }

      setLoading(false);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const adminMe = async () => {
    dispatch(setProgress(true));
    try {
      const adminToken = localStorage.getItem("adminToken");
      const proprietorToken = localStorage.getItem("proprietorToken");
      if (adminToken) {
        const result = await api.post("/auth/adminMe", { adminToken });
        // dispatch(setProgress(false));
        if (result.data.success == false) {
          navigateTo("/");
        }
      }
       if (proprietorToken) {
        const result = await api.post("/auth/proprietorMe", { proprietorToken });
        // dispatch(setProgress(false));
        if (result.data.success == false) {
          navigateTo("/");
        }
      }
    } catch (error: any) {
      navigateTo("/");
    } finally {
      dispatch(setProgress(false));
    }
  };

  return {
    adminMe,
    adminLogin,
    loading,
  };
}

export default useAdminAuth;
