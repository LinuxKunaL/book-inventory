import { getNotificationsService } from "@services/student.service";
import { setNotificationCount } from "@slice/student/notificationSlice";
import { setProgress } from "@slice/others/progressLoading";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import type { LoaderFunctionArgs } from "react-router";

function useNotificationApi() {
  const dispatch = useDispatch();

  const getNotifications = async ({ request }: LoaderFunctionArgs) => {
    dispatch(setProgress(true));
    try {
      const result = await getNotificationsService(request);
      dispatch(setProgress(false));
      dispatch(setNotificationCount(0));
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
