import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { type LoaderFunctionArgs } from "react-router";
import {
  createQuizService,
  deleteQuizService,
  getParticipantsService,
  getQuizByIdService,
  getQuizzesService,
  updateQuizService,
} from "@services/admin.service";
import { setProgress } from "@slice/others/progressLoading";
import { useState } from "react";
import { ObjectId } from "bson";
import type { TCourse } from "src/types/course";
import { navigateTo } from "@servicesOther/navigationService";

function useQuizApi() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getQuizzes = async ({ request }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    try {
      const result = await getQuizzesService(request);
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

  const createQuiz = async (data: any) => {
    setLoading(true);
    console.log(data);

    try {
      const result = await createQuizService(data);
      setLoading(false);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw error.response;
      }
    } finally {
      setLoading(false);
    }
  };

  const getQuizById = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;

    if (!id) {
      navigateTo("/admin/quizzes");
      return;
    }

    if (!ObjectId.isValid(id)) {
      navigateTo("/admin/quizzes");
      return;
    }

    dispatch(setProgress(true));
    try {
      const result: TCourse = await getQuizByIdService(id);
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

  const getParticipants = async ({ request, params }: LoaderFunctionArgs) => {
    const { id } = params;

    if (!id) {
      navigateTo("/admin/quizzes");
      return;
    }

    if (!ObjectId.isValid(id)) {
      navigateTo("/admin/quizzes");
      return;
    }

    dispatch(setProgress(true));
    try {
      const result = await getParticipantsService(request, id);
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

  const updateQuiz = async (data: any) => {
    setLoading(true);
    try {
      const result = await updateQuizService(data);
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

  const deleteQuiz = async (id: string) => {
    setLoading(true);
    try {
      const result = await deleteQuizService(id);
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

  return {
    getParticipants,
    getQuizzes,
    createQuiz,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    loading,
  };
}

export default useQuizApi;
