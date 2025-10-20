import api from "../axios.api";

/** 
 * @function adminLoginService - Admin login service 
 * @param data - Admin login data 
 * @returns - Admin login response */ 

export const adminLoginService = async (data: any): Promise<any> => {
  const res = await api.post("auth/admin-login", data);
  return res.data;
};

/** 
 * @function adminMeService - Admin verify service
 * @returns - Response */ 

export const adminMeService = async (): Promise<any> => {
  const res = await api.post("auth/admin/me");
  return res.data;
};

export const requestOtpService = async (data: any): Promise<any> => {
  const res = await api.post("auth/request-otp", data);
  return res.data;
};

/** 
 * @function studentRegisterService - Student registration service also otp verification
 * @param data - Student registration data with OTP
 * @returns - Student registration response */
export const studentRegisterService = async (data: any): Promise<any> => {
  const res = await api.post("auth/student-register", data);
  return res.data;
};

export const updateStudentService = async (data: any): Promise<any> => {
  const res = await api.put("auth/student", data);
  return res.data;
};

export const updatePasswordService = async (data: any): Promise<any> => {
  const res = await api.put("auth/student/password", data);
  return res.data;
}

export const studentLoginService = async (data: any): Promise<any> => {
  const res = await api.post("auth/student-login", data);
  return res.data;
};

export const studentMeService = async (): Promise<any> => {
  const res = await api.post("auth/student/me");
  return res.data;
}