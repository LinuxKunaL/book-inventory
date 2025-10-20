import { ObjectId } from "bson";
import { AxiosError } from "axios";
import {
  getCoursesService,
  getCourseByIdService,
  getEnrolledCoursesService,
  courseEnrollmentService,
  courseUpdateProgressService,
} from "@services/student.service";
import { useDispatch } from "react-redux";
import { type LoaderFunctionArgs } from "react-router";
import { setProgress } from "@slice/others/progressLoading";
import type { TCourse } from "src/types/course";
import { useState } from "react";
import { navigateTo } from "@servicesOther/navigationService";

function useCourseApi() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getCourses = async ({ request }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    try {
      const result = await getCoursesService(request);
      dispatch(setProgress(false));
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    } finally {
      dispatch(setProgress(false));
    }
  };

  const getEnrolledCourses = async () => {
    dispatch(setProgress(true));
    try {
      const result = await getEnrolledCoursesService();
      dispatch(setProgress(false));
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    } finally {
      dispatch(setProgress(false));
    }
  };

  const courseEnroll = async (courseId: string) => {
    setLoading(true);
    try {
      const result = await courseEnrollmentService(courseId);
      setLoading(false);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;

    if (!id) {
      navigateTo("/admin/courses");
      return;
    }

    if (!ObjectId.isValid(id)) {
      navigateTo("/admin/courses");
      return;
    }

    dispatch(setProgress(true));
    try {
      const result: TCourse = await getCourseByIdService(id);
      dispatch(setProgress(false));
      if (!result) {
        navigateTo("/dashboard/courses");
      }
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    } finally {
      dispatch(setProgress(false));
    }
  };

  const updateProgress = async (courseId: string | undefined, data: any) => {
    try {
      const result = await courseUpdateProgressService({ courseId, ...data });
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    }
  };

  return {
    loading,
    getCourses,
    courseEnroll,
    getCourseById,
    updateProgress,
    getEnrolledCourses,
  };
}

export default useCourseApi;
