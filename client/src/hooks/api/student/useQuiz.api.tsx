import { ObjectId } from "bson";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { type LoaderFunctionArgs } from "react-router";
import { setProgress } from "@slice/others/progressLoading";
import { navigateTo } from "@servicesOther/navigationService";
import {
  quizSubmitService,
  quizResultService,
  quizAttemptService,
  getQuizzesService,
  getAttemptQuizzesService,
} from "@services/student.service";
import { useState } from "react";
import { toast } from "@functions/toast/toast";

function useQuizApi() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getQuizzes = async ({ request }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    try {
      const result = await getQuizzesService(request);
      dispatch(setProgress(false));
      if (result.quizzes.length === 0 && result.totalQuizzes != 0) {
        toast.error("No quizzes found from filters");
        navigateTo("/dashboard/quizzes/browse?page=1");
      }
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    }
  };

  const getAttemptQuizzes = async ({ request }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    try {
      const result = await getAttemptQuizzesService(request);
      dispatch(setProgress(false));
      if (result.quizzes.length === 0 && result.totalQuizzes != 0) {
        toast.error("No quizzes found from filters");
        navigateTo("/dashboard/quizzes?page=1");
        return;
      }
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    }
  };

  const quizAttempt = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (!id) {
      navigateTo("/student/quizzes");
      return;
    }
    if (!ObjectId.isValid(id)) {
      navigateTo("/student/quizzes");
      return;
    }
    dispatch(setProgress(true));
    try {
      const result = await quizAttemptService(id);
      dispatch(setProgress(false));
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        navigateTo("/dashboard/quizzes/browse");
        if (error.response) {
          toast.error(error.response.data.error);
        }
        throw error.response;
      }
    } finally {
      dispatch(setProgress(false));
    }
  };

  const quizSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await quizSubmitService(data);
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

  const getQuizResult = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (!id) {
      navigateTo("/dashboard/quizzes");
      return;
    }
    if (!ObjectId.isValid(id)) {
      navigateTo("/dashboard/quizzes");
      return;
    }
    dispatch(setProgress(true));
    try {
      const result = await quizResultService(id);
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

  return {
    loading,
    quizSubmit,
    getQuizzes,
    quizAttempt,
    getAttemptQuizzes,
    getQuizResult,
  };
}

export default useQuizApi;
