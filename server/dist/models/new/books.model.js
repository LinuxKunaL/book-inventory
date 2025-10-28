"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    bookImage: {
        type: String,
        required: true,
        trim: true,
    },
    bookName: {
        type: String,
        required: true,
        trim: true,
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    mrp: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
exports.MBook = mongoose_1.default.model("Book", bookSchema);
