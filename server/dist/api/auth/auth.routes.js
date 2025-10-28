"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_model_1 = require("../../models/admin.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = __importDefault(require("../../config/app.config"));
const user_model_1 = require("../../models/new/user.model");
const router = (0, express_1.Router)();
// router.post("/admin-login", AuthController.adminLogin);
router.post("/login", async (req, res) => {
    try {
        const role = req.body.role;
        if (role == "admin") {
            const result = await admin_model_1.MAdmin.findOne({
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
            const result = await user_model_1.MUser.findOne({
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
    }
    catch (error) { }
});
router.post("/adminMe", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jsonwebtoken_1.default.verify(token, app_config_1.default.jwt.secret);
    const admin = await admin_model_1.MAdmin.findById(decode.adminId);
    if (!admin) {
        return res.status(200).send({ success: false });
    }
    return res.status(200).send({ success: true });
});
router.post("/proprietorMe", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jsonwebtoken_1.default.verify(token, app_config_1.default.jwt.secret);
    const proprietor = await user_model_1.MUser.findById(decode.proprietorId);
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
exports.default = router;
