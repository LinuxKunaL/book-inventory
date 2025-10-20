import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { type LoaderFunctionArgs } from "react-router";
import {
  createCourseService,
  deleteCourseService,
  getCourseByIdService,
  getCoursesService,
  updateCourseService,
} from "@services/admin.service";
import { setProgress } from "@slice/others/progressLoading";
import { useState } from "react";
import { ObjectId } from "bson";
import type { TCourse } from "src/types/course";
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
    }
  };

  const createCourse = async (data: any) => {
    setLoading(true);
    try {
      const result = await createCourseService(data);
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

  const updateCourse = async (data: any) => {
    setLoading(true);
    try {
      const result = await updateCourseService(data);
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

  const deleteCourse = async (id: string) => {
    setLoading(true);
    try {
      const result = await deleteCourseService(id);
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

  return { getCourses, getCourseById, createCourse, updateCourse, deleteCourse, loading };
}

export default useCourseApi;
