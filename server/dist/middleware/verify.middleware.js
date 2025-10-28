"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = __importDefault(require("../config/app.config"));
const admin_model_1 = require("../models/admin.model");
const user_model_1 = require("../models/new/user.model");
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
const verify = async (req, res, next) => {
    const { path } = req;
    if (path === "/api/auth/login") {
        return next();
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decode = jsonwebtoken_1.default.verify(token, app_config_1.default.jwt.secret);
    if (decode?.adminId) {
        const result = await admin_model_1.MAdmin.findById(decode.adminId);
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
        const result = await user_model_1.MUser.findById(decode.proprietorId);
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
exports.default = verify;
