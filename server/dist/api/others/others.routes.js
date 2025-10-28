"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const others_controller_1 = __importDefault(require("./others.controller"));
const router = (0, express_1.Router)();
router.put("/school", others_controller_1.default.registerSchool);
router.get("/uploads", others_controller_1.default.getUploads);
exports.default = router;
