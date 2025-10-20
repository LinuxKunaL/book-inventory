import { toast } from "@functions/toast/toast";
import { navigateTo } from "@servicesOther/navigationService";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendError = error.response.data.error;
    if (backendError == "jwt expired") {
      toast.error("Session expired Login again");
      return navigateTo("/");
    }
    return error;
  }
);

export default api;
