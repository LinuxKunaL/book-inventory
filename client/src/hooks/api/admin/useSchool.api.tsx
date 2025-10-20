import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import type { LoaderFunctionArgs } from "react-router";
import { getSchoolsService } from "@services/admin.service";
import { setProgress } from "@slice/others/progressLoading";

function useSchoolApi() {
  const dispatch = useDispatch();

  const getSchools = async ({ request }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    try {
      const result = await getSchoolsService(request);
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

  return { getSchools };
}

export default useSchoolApi;
