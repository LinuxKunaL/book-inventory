"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _config = {
    client: [
        "http://192.168.0.134:5173",
        "http://localhost:5173",
        "http://10.43.48.88:5173",
    ],
    port: 3000,
    db: {
        url: "mongodb+srv://thelosser321:IZhLRZWiday5zAJ2@clusterteehaven.fy29l9l.mongodb.net/bookStore"
    },
    fast2sms_api_key: "026WIDwSiQVeFAXfad4r37BvJuYsRcOo1p9bPMUyz5ZlmLjqxhAakybzEi0SjWqDNtReh1vQKlTwJmMd",
    jwt: {
        secret: "secret",
        expiresIn: "2d",
    },
};
const config = Object.freeze(_config);
exports.default = config;
