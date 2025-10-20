import type { LoaderFunctionArgs } from "react-router";
import api from "../axios.api";
import { toast } from "@functions/toast/toast";

/**
 * @function createStudentService - create Student service from admin
 * @param data - Student data
 * @returns - response */
export const createStudentService = async (data: any): Promise<any> => {
  const res = await api.post("admin/students", data);
  return res.data;
};

/**
 * @function getStudents - get all Students service from admin
 * @returns - response */
export const getStudentsService = async (
  request: LoaderFunctionArgs["request"]
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());

  try {
    const res = await api.get("admin/students", { params: paramsObject });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getStudentByIdService = async (id: string): Promise<any> => {
  try {
    const res = await api.get(`admin/students/${id}`);
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

/**
 * @function getSchoolsService - get all Schools service from admin
 * @returns - response */
export const getSchoolsService = async (
  request?: LoaderFunctionArgs["request"],
  type?: string
): Promise<any> => {
  var paramsObject = {};
  if (request) {
    const url = new URL(request.url);
    paramsObject = Object.fromEntries(url.searchParams.entries());
  }

  try {
    const res = await api.get("admin/schools", {
      params: type ? { type } : paramsObject,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateStudentService = async (data: any): Promise<any> => {
  const res = await api.put("admin/students", data);
  return res.data;
};

/**
 * @function createCourseService - create Course service from admin
 * @param data - Course data
 * @returns - response */
export const createCourseService = async (data: any): Promise<any> => {
  const res = await api.post("/admin/courses", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

/**
 * @function getCoursesService - get all Courses service from admin
 * @returns - response */
export const getCoursesService = async (
  request: LoaderFunctionArgs["request"]
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());

  const res = await api.get("/admin/courses", { params: paramsObject });
  return res.data;
};

/**
 * @function getCourseByIdService - get Course by id service from admin
 * @param id - Course id
 * @returns - response */
export const getCourseByIdService = async (id: string): Promise<any> => {
  const res = await api.get(`/admin/courses/${id}`);
  return res.data;
};

/**
 * @function updateCourseService - update Course service from admin
 * @param data - Course data
 * @returns - response */
export const updateCourseService = async (data: any): Promise<any> => {
  const res = await api.put("/admin/courses", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

/**
 * @function deleteCourseService - delete Course service from admin
 * @param id - Course id
 * @returns - response */
export const deleteCourseService = async (id: string): Promise<any> => {
  const res = await api.delete(`/admin/courses/${id}`);
  return res.data;
};

export const createQuizService = async (data: any): Promise<any> => {
  const res = await api.post("/admin/quizzes", data);
  return res.data;
};

export const getQuizzesService = async (
  request: LoaderFunctionArgs["request"]
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());

  const res = await api.get("/admin/quizzes", { params: paramsObject });
  return res.data;
};

export const getQuizByIdService = async (id: string): Promise<any> => {
  const res = await api.get(`/admin/quizzes/${id}`);
  return res.data;
};

export const getParticipantsService = async (
  request: LoaderFunctionArgs["request"],
  id: string
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());

  const res = await api.get(`/admin/quizzes/${id}/participants`, {
    params: paramsObject,
  });
  return res.data;
};

export const deleteQuizService = async (id: string): Promise<any> => {
  const res = await api.delete(`/admin/quizzes/${id}`);
  return res.data;
};

export const updateQuizService = async (data: any): Promise<any> => {
  const res = await api.put("/admin/quizzes", data);
  return res.data;
};

export const getNotificationsService = async (
  request: LoaderFunctionArgs["request"]
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());
  const res = await api.get("/admin/notifications", { params: paramsObject });
  return res.data;
};

export const getOverviewDataService = async () => {
  const res = await api.get("/admin/overview");
  return res.data;
};
