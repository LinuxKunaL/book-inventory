import { jwtDecode } from "jwt-decode";
import SocketIOClient from "socket.io-client";

const getUserid = () => {
  try {
    const token = localStorage.getItem("token") || "";
    if (token) {
      const { studentId } = jwtDecode(token) as { studentId: string };
      return studentId;
    }
  } catch (error) {
    console.log(error, "in Socket");
  }
};

const socket = SocketIOClient(import.meta.env.VITE_API_URL, {
  query: {
    student: getUserid(),
  },
});

export default socket;
