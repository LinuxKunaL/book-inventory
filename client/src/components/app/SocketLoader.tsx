import { toast } from "@functions/toast/toast";
import useNotifySound from "@hooks/others/useNotifySound";
import socket from "@servicesSocket/index";
import {
  setNotificationCount,
  setNotificationDataReload,
} from "@slice/student/notificationSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function SocketLoader() {
  const dispatch = useDispatch();

  const { playSound } = useNotifySound();

  useEffect(() => {
    socket.on("receive:notify", () => {
      dispatch(setNotificationCount(""));
      dispatch(setNotificationDataReload());
      playSound();
      toast.info("You have a new notification");
    });
    socket.on("receive:delete:notify", () => {
      dispatch(setNotificationDataReload());
    });
    return () => {
      socket.off("receive:notify");
    };
  }, [ dispatch, playSound ]);

  return null;
}

export default SocketLoader;
