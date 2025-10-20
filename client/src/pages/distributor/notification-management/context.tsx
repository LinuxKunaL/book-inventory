import type { TNotification } from "@types_/notification";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TNotificationData = {
  notifications: TNotification[]
  totalNotifications: number
}

type TContextType = {
  data: TNotificationData; 
  setData: Dispatch<SetStateAction<TNotificationData>>;
};

export const NotificationStates = createContext<TContextType>({} as TContextType);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TNotificationData>({} as TNotificationData); 
  return (
    <NotificationStates.Provider value={{ data, setData }}>
      {children}
    </NotificationStates.Provider>
  );
}

export default NotificationProvider;
