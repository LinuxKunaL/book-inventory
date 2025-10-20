import socket from "..";

export const emitNotification = (notification: any) => {
  socket.emit("emit:notify", notification);
};

export const deleteNotification = (notificationId: string) => {
  socket.emit("delete:notify", { _id: notificationId });
};

export const receiveNotification = (callback: (data: any) => void) => {
  socket.on("receive:notify", (data) => {
    callback(data);
  });
};
