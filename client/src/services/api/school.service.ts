import api from "../axios.api";

/**
 * @function schoolRegisterService - create School service from admin
 * @param data - School data
 * @returns - response
 */
export const schoolRegisterService = async (data: any) => {
  const res = await api.put("/other/school", data);
  return res.data;
};
