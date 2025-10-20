import type { LoaderFunctionArgs } from "react-router";
import api from "../axios.api";

// ―――――――――――――――――――Courses Services――――――――――――――――――――――――――――――――
/**
 * @function getCoursesService - get all Courses service
 * @returns - response */
export const getCoursesService = async (
  request: LoaderFunctionArgs["request"]
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());

  const res = await api.get("/student/courses", { params: paramsObject });
  return res.data;
};

/**
 * @function getEnrolledCoursesService - get all enrolled Courses service
 * @returns - response */
export const getEnrolledCoursesService = async (): Promise<any> => {
  const res = await api.get("/student/courses/enrolled");
  return res.data;
};

/**
 * @function getCourseByIdService - get Course by id service
 * @param id - Course id
 * @returns - response */
export const getCourseByIdService = async (id: string): Promise<any> => {
  const res = await api.get(`/student/courses/${id}`);
  return res.data;
};

/**
 * @function courseEnrollmentService - enroll Course service
 * @param id - Course id
 * @returns - response */
export const courseEnrollmentService = async (id: string): Promise<any> => {
  const res = await api.post("/student/courses/enroll", { id });
  return res.data;
};

export const courseUpdateProgressService = async (data: any): Promise<any> => {
  const res = await api.put("/student/courses/progress", { ...data });
  return res.data;
};
// ―――――――――――――――――――Courses Services――――――――――――――――――――――――――――――――

// ―――――――――――――――――――Quizzes Services――――――――――――――――――――――――――――――――

export const getQuizzesService = async (
  request: LoaderFunctionArgs["request"]
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());
  const res = await api.get("/student/quizzes", { params: paramsObject });
  return res.data;
};

export const getAttemptQuizzesService = async (
  request: LoaderFunctionArgs["request"]
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());
  const res = await api.get("/student/quizzes/attempts", {
    params: paramsObject,
  });
  return res.data;
};

export const quizAttemptService = async (id: string): Promise<any> => {
  const res = await api.get(`/student/quizzes/attempt/${id}`);
  return res.data;
};

export const quizSubmitService = async (data: any): Promise<any> => {
  const res = await api.post("/student/quizzes/submit", data);
  return res.data;
};

export const quizResultService = async (id: string): Promise<any> => {
  const res = await api.get(`/student/quizzes/result/${id}`);
  return res.data;
};

// ―――――――――――――――――――Quizzes Services――――――――――――――――――――――――――――――――

// ―――――――――――――――――――Notification Services―――――――――――――――――――――――――――――
export const getNotificationsService = async (
  request: LoaderFunctionArgs["request"]
): Promise<any> => {
  const url = new URL(request.url);
  const paramsObject = Object.fromEntries(url.searchParams.entries());
  const res = await api.get("/student/notifications", { params: paramsObject });
  return res.data;
};

export const getOverviewDataService = async () => {
  const res = await api.get("/student/overview");
  return res.data;
};

export const getAchievementsService = async () => {
  const res = await api.get("/student/overview/achievements");
  return res.data;
};
