import express, { Request, Response } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import cors from "cors";
import config from "../config/app.config";
import adminVerify from "../middleware/verify.middleware";

import AuthRoutes from "../api/auth/auth.routes";
import AdminRoutes from "../api/admin/admin.routes";
import StudentRoutes from "../api/student/student.routes";
import OtherRoutes from "../api/others/others.routes";
import { handleError } from "../middleware/errorHandler.middleware";

export default  function expressLoader() {
  const app = express();

  const corsOptions = {
    origin: config.client,
    credentials: true,
  };
  const defaultHtml = readFileSync(
    join(__dirname, "../views/default.html"),
    "utf-8"
  );

  /** @Middleware */
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(adminVerify);

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send(defaultHtml);
  });

  app.use("/api/auth", AuthRoutes);
  app.use("/api/admin", AdminRoutes);
  app.use("/api/student", StudentRoutes);
  app.use("/api/other", OtherRoutes);

  app.use(handleError);
  return app;
}
