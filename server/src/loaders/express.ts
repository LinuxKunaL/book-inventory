import express, { Request, Response, NextFunction } from "express";
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

export default function expressLoader() {
  const app = express();

  // ✅ CORS Configuration for all routes
  const corsOptions = {
    origin: "*", // Allow all origins (you can restrict later)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(cors(corsOptions));

  // ✅ Handle preflight requests globally
  app.options("*", cors(corsOptions));

  // ✅ JSON and URL-encoded middleware
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));

  // ✅ Set custom headers manually for extra safety
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  const defaultHtml = readFileSync(
    join(__dirname, "../views/default.html"),
    "utf-8"
  );

  /** @Routes */
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send(defaultHtml);
  });

  // ✅ Apply routes (adminVerify can be applied selectively if needed)
  app.use("/api/auth", AuthRoutes);
  app.use("/api/admin", adminVerify, AdminRoutes);
  app.use("/api/student", StudentRoutes);
  app.use("/api/other", OtherRoutes);

  // ✅ Error handler middleware (always last)
  app.use(handleError);

  return app;
}
