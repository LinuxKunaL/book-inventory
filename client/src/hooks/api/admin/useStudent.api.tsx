import {
  createStudentService,
  getStudentByIdService,
  getStudentsService,
  updateStudentService,
} from "@services/admin.service";
import { navigateTo } from "@servicesOther/navigationService";
import { setProgress } from "@slice/others/progressLoading";
import { AxiosError } from "axios";
import { ObjectId } from "bson";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { LoaderFunctionArgs } from "react-router";

function useStudentApi() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const createStudent = async (params: any) => {
    setLoading(true);
    try {
      const result = await createStudentService(params);
      setLoading(false);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoading(false);
        throw error.response;
      }
    } finally {
      setLoading(false);
    }
  };

  const getStudents = async ({ request }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    try {
      const result = await getStudentsService(request);
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

  const updateStudent = async (params: any) => {
    setLoading(true);
    try {
      const result = await updateStudentService(params);
      setLoading(false);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoading(false);
        throw error.response;
      }
    } finally {
      setLoading(false);
    }
  };

  const getStudentById = async ({ params }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    const { id } = params;

    if (!id) {
      navigateTo("/admin/students");
      return;
    }

    if (!ObjectId.isValid(id)) {
      navigateTo("/admin/students");
      return;
    }

    try {
      const result = await getStudentByIdService(id);
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

  return { createStudent, loading, getStudents, updateStudent, getStudentById };
}

export default useStudentApi;
