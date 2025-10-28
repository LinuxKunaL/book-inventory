"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = expressLoader;
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const verify_middleware_1 = __importDefault(require("../middleware/verify.middleware"));
const auth_routes_1 = __importDefault(require("../api/auth/auth.routes"));
const admin_routes_1 = __importDefault(require("../api/admin/admin.routes"));
const student_routes_1 = __importDefault(require("../api/student/student.routes"));
const others_routes_1 = __importDefault(require("../api/others/others.routes"));
const errorHandler_middleware_1 = require("../middleware/errorHandler.middleware");
function expressLoader() {
    const app = (0, express_1.default)();
    // ✅ CORS Configuration for all routes
    const corsOptions = {
        origin: "*", // Allow all origins (you can restrict later)
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
    // ✅ Handle preflight requests globally
    app.options("*", (0, cors_1.default)(corsOptions));
    // ✅ JSON and URL-encoded middleware
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    // ✅ Set custom headers manually for extra safety
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        next();
    });
    const defaultHtml = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "../views/default.html"), "utf-8");
    /** @Routes */
    app.get("/", (req, res) => {
        res.status(200).send(defaultHtml);
    });
    // ✅ Apply routes (adminVerify can be applied selectively if needed)
    app.use("/api/auth", auth_routes_1.default);
    app.use("/api/admin", verify_middleware_1.default, admin_routes_1.default);
    app.use("/api/student", student_routes_1.default);
    app.use("/api/other", others_routes_1.default);
    // ✅ Error handler middleware (always last)
    app.use(errorHandler_middleware_1.handleError);
    return app;
}
