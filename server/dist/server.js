"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("./config/app.config"));
const mongoose_1 = __importDefault(require("./loaders/mongoose"));
const admin_seed_1 = require("./seed/admin.seed");
const socket_1 = __importDefault(require("./loaders/socket"));
const achievements_seed_1 = require("./seed/achievements.seed");
(async () => {
    await (0, mongoose_1.default)();
    // Seeding
    await (0, admin_seed_1.defaultAdminCredentials)();
    await (0, achievements_seed_1.seedAchievements)();
    const server = (0, socket_1.default)();
    server.listen(app_config_1.default.port, () => {
        console.log(`Socket and express is running on port ${app_config_1.default.port}`);
    });
})();
