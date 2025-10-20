import http from "http";
import expressLoader from "./express";
import initSocket from "../socket";

const socketLoader = () => {
  const app = expressLoader();

  const server = http.createServer(app);

  initSocket(server);

  return server;
};

export default socketLoader;
