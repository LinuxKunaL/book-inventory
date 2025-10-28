"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAdminCredentials = void 0;
const admin_model_1 = require("../models/admin.model");
const data_1 = require("./data");
// This method will create default admin credentials
const defaultAdminCredentials = async () => {
    const adminExist = await admin_model_1.MAdmin.findOne({ gmail: "admintejas@gmail.com" });
    if (adminExist) {
        return;
    }
    await admin_model_1.MAdmin.create(data_1.AdminCredentials);
};
exports.defaultAdminCredentials = defaultAdminCredentials;
