
import { getOverviewDataService } from "@services/admin.service";
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



  return { getOverviewData,  };
}

export default useOverviewApi;
