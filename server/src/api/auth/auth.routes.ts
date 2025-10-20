import { Router } from "express";
import AuthController from "./auth.controller";
import { MAdmin } from "../../models/admin.model";
import jwt from "jsonwebtoken";
import config from "../../config/app.config";
import { success } from "zod/v4";
import { MUser } from "../../models/new/user.model";

const router = Router();

// router.post("/admin-login", AuthController.adminLogin);
router.post("/login", async (req, res): Promise<any> => {
  try {
    const role = req.body.role;

    if (role == "admin") {
      const result = await MAdmin.findOne({
        gmail: req.body.email,
        password: req.body.password,
      });

      if (!result) {
        res.status(404).send({
          error: "Admin not found",
        });
      }

      const token = await result.generateToken();

      return res.status(200).send({
        token,
      });
    }
    if (role == "proprietor") {
      const result = await MUser.findOne({
        email: req.body.email,
        password: req.body.password,
      });

      if (!result) {
        res.status(404).send({
          error: "proprietor not found",
        });
      }

      const token = await result.generateToken();

      return res.status(200).send({
        token,
      });
    }
  } catch (error) {}
});
router.post("/adminMe", async (req, res): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];
  const decode: any = jwt.verify(token, config.jwt.secret);

  const admin = await MAdmin.findById(decode.adminId);

  if (!admin) {
    return res.status(200).send({ success: false });
  }
  return res.status(200).send({ success: true });
});

router.post("/proprietorMe", async (req, res): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];
  const decode: any = jwt.verify(token, config.jwt.secret);

  const proprietor = await MUser.findById(decode.proprietorId);

  if (!proprietor) {
    return res.status(200).send({ success: false });
  }
  return res.status(200).send({ success: true });
});
// router.post("/admin/me", AuthController.adminMe);

// router.post("/request-otp", AuthController.requestOtp);
// router.post("/student-register",AuthController.studentRegister);
// router.post("/student-login",AuthController.studentLogin);
// router.post("/student/me", AuthController.studentMe);
// router.put("/student", AuthController.updateStudent);
// router.put("/student/password",AuthController.updatePassword);
// router.post("/student-verify", AuthController.studentVerify);

// router.post("/school-register");

export default router;
