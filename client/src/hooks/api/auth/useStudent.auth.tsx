import {
  studentLoginService,
  requestOtpService,
  studentRegisterService,
  studentMeService,
  updateStudentService,
  updatePasswordService,
} from "@services/auth.service";
import { useState } from "react";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setProgress } from "@slice/others/progressLoading";
import { navigateTo } from "@servicesOther/navigationService";

function useStudentAuth() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  /**
   * This function is used to request an OTP for student authentication.
   * @param {Object} data - The data containing Mobile & admission number.
   **/
  const requestOtp = async (data: any) => {
    setLoading(true);
    try {
      const response = await requestOtpService(data);
      setLoading(false);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setLoading(false);
        throw error.response;
      }
    }
  };

  /**
   * This function is used to register a student when the OTP is verified.
   * @param {Object} data - The data containing student details.
   */
  const registerStudent = async (data: any) => {
    setLoading(true);
    try {
      const response = await studentRegisterService(data);
      setLoading(false);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setLoading(false);
        throw error.response;
      }
    }
  };

  const loginStudent = async (data: any) => {
    setLoading(true);
    try {
      const response = await studentLoginService(data);
      localStorage.setItem("token", response.token);
      setLoading(false);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoading(false);
        throw error.response;
      }
    }
  };

  const studentMe = async (): Promise<any> => {
    dispatch(setProgress(true));
    try {
      const response = await studentMeService();
      dispatch(setProgress(false));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(setProgress(false));
        throw error.response;
      }
    }
  };

  const updateStudent = async (data: any) => {
    setLoading(true);
    try {
      const response = await updateStudentService(data);
      setLoading(false);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setLoading(false);
        throw error.response;
      }
    }
  };

  const updatePassword = async (data: any) => {
    setLoading(true);
    try {
      const response = await updatePasswordService(data);
      setLoading(false);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setLoading(false);
        throw error.response;
      }
    }
  };

  const logout = () => {
    navigateTo("/");
    localStorage.removeItem("token");
  };

  return {
    loading,
    logout,
    studentMe,
    requestOtp,
    loginStudent,
    updateStudent,
    updatePassword,
    registerStudent,
  };
}

export default useStudentAuth;
