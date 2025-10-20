import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { getNotificationsService } from "@services/admin.service";
import { setProgress } from "@slice/others/progressLoading";
import type { LoaderFunctionArgs } from "react-router";

function useNotificationApi() {
  const dispatch = useDispatch();

  const getNotifications = async ({ request }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    try {
      const result = await getNotificationsService(request);
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

  return { getNotifications };
}

export default useNotificationApi;
