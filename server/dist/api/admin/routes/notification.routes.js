"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifications_controller_1 = __importDefault(require("../controllers/notifications.controller"));
const router = (0, express_1.Router)();
router.get("/", notifications_controller_1.default.getNotifications);
exports.default = router;
