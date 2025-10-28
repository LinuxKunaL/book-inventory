"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFileType = exports.ESkipPath = void 0;
var ESkipPath;
(function (ESkipPath) {
    ESkipPath["ADMIN_LOGIN"] = "/admin-login";
    ESkipPath["SCHOOL_REGISTER"] = "/api/other/school";
    ESkipPath["UPLOADS"] = "uploads";
    ESkipPath["STUDENT_LOGIN"] = "/student-login";
    ESkipPath["STUDENT_REGISTER"] = "/student-register";
    ESkipPath["STUDENT_OTP"] = "/request-otp";
})(ESkipPath || (exports.ESkipPath = ESkipPath = {}));
var EFileType;
(function (EFileType) {
    EFileType["THUMBNAIL"] = "thumbnail";
    EFileType["RESOURCE"] = "resource";
    EFileType["VIDEO"] = "video";
})(EFileType || (exports.EFileType = EFileType = {}));
