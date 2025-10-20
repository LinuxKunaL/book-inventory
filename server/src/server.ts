import http from "http";
import config from "./config/app.config";
import expressLoader from "./loaders/express";
import mongooseLoader from "./loaders/mongoose";
import initSocket from "./socket/index";
import { defaultAdminCredentials } from "./seed/admin.seed";
import socketOrExpressLoader from "./loaders/socket";
import { seedAchievements } from "./seed/achievements.seed";

(async () => {
  await mongooseLoader();

  // Seeding
  await defaultAdminCredentials();
  await seedAchievements()

  const server = socketOrExpressLoader();

  server.listen(config.port, () => {
    console.log(`Socket and express is running on port ${config.port}`);
  });
})();
