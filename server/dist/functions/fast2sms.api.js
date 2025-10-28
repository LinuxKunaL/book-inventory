"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("../config/app.config"));
const sendSms = async (number, otp) => {
    try {
        const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: app_config_1.default.fast2sms_api_key,
            },
            body: JSON.stringify({
                sender_id: "TXTIND",
                message: `Your OTP for finteen is ${otp}. Do not share it with anyone.`,
                language: "english",
                route: "q",
                numbers: number,
            }),
        });
        const text = await response.text();
        try {
            return JSON.parse(text);
        }
        catch {
            return { raw: text };
        }
    }
    catch (error) {
        console.error("sendSms error:", error);
        throw error;
    }
};
exports.default = sendSms;
