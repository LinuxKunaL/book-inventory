import type { TNotification } from "@types_/notification";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { useRevalidator } from "react-router";
import type { RootState } from "src/store/reduxStore";

type NotificationData = {
  notifications: TNotification[];
  totalNotifications: number;
};

type TContextType = {
  data: NotificationData;
  setData: Dispatch<SetStateAction<NotificationData>>;
};

export const NotificationStates = createContext<TContextType>({
  data: {} as NotificationData,
  setData: () => {},
});

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<any>([]);
  const { revalidate } = useRevalidator();
  const notification = useSelector(
    (state: RootState) => state.notificationSlice
  );

  useEffect(() => {
    if (notification.reload != 0) {
      if (data.length != 0) {
        revalidate();
      }
    }
  }, [notification.reload]);

  return (
    <NotificationStates.Provider value={{ data, setData }}>
      {children}
    </NotificationStates.Provider>
  );
}

export default NotificationProvider;
