import {
  getAchievementsService,
  getOverviewDataService,
} from "@services/student.service";
import { setProgress } from "@slice/others/progressLoading";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";

function useOverviewApi() {
  const dispatch = useDispatch();

  const getOverviewData = async () => {
    try {
      const result = await getOverviewDataService();
      dispatch(setProgress(false));
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    }
  };

  const getAchievements = async () => {
    dispatch(setProgress(true));
    try {
      const result = await getAchievementsService();
      dispatch(setProgress(false));
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        throw error.response;
      }
    }
  };

  return { getOverviewData, getAchievements };
}

export default useOverviewApi;
