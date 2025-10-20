import { NextFunction, Request, Response } from "express";
import authService from "../api/auth/auth.service";
import { ESkipPath } from "../types/enum";
import jwt from "jsonwebtoken";
import config from "../config/app.config";
import { MAdmin } from "../models/admin.model";
import { MUser } from "../models/new/user.model";

// const verify = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<any> => {
//   const { path } = req;

//   if (path === "/") {
//     return next();
//   }

//   if (path.includes(ESkipPath.ADMIN_LOGIN)) {
//     return next();
//   }

//   if (path === ESkipPath.SCHOOL_REGISTER) {
//     return next();
//   }

//   if (path.includes(ESkipPath.UPLOADS)) {
//     return next();
//   }

//   if (path.includes(ESkipPath.STUDENT_LOGIN)) {
//     return next();
//   }

//   if (path.includes(ESkipPath.STUDENT_OTP)) {
//     return next();
//   }

//   if (path.includes(ESkipPath.STUDENT_REGISTER)) {
//     return next();
//   }

//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const decode: any = jwt.verify(token, config.jwt.secret);

//   if (decode?.adminId) {
//     const result = await authService.adminVerify(decode.adminId);
//     if (result?.error) {
//       return res.status(401).json({ error: result.error });
//     }
//     if (result?.success) {
//       req.admin = {
//         id: result.data._id,
//         username: result.data.username,
//       };
//       next();
//     }
//   }

//   if (decode?.studentId) {
//     const result = await authService.studentVerify(decode.studentId);
//     if (result?.error) {
//       return res.status(401).json({ error: result.error });
//     }
//     if (result?.success) {
//       req.student = {
//         id: result.data._id,
//         name: result.data.studentName,
//         classStandard: result.data.classStandard,
//         school: result.data.school,
//         section: result.data.section,
//       };
//       next();
//     }
//   }
// };

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { path } = req;

  if (path === "/api/auth/login") {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decode: any = jwt.verify(token, config.jwt.secret);

  if (decode?.adminId) {
    const result = await MAdmin.findById(decode.adminId);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result) {
      req.admin = {
        id: result._id,
        username: result.username,
      };
      next();
    }
  }

  if (decode?.proprietorId) {
    const result = await MUser.findById(decode.proprietorId);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result) {
      req.user = {
        id: result._id,
      };
      next();
    }
  }
};

export default verify;
