"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongooseLoader;
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_1 = __importDefault(require("../config/app.config"));
async function mongooseLoader() {
    const url = app_config_1.default.db.url;
    mongoose_1.default.connect(url).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });
}
