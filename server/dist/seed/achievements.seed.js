"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAchievements = seedAchievements;
const achievement_model_1 = require("../models/achievement.model");
const data_1 = require("./data");
async function seedAchievements() {
    try {
        data_1.AchievementsData.forEach(async (achievement) => {
            const exists = await achievement_model_1.MAchievement.findOne({
                condition: achievement.condition,
            });
            if (!exists) {
                await achievement_model_1.MAchievement.create(achievement);
            }
        });
    }
    catch (err) {
        console.error(err);
    }
}
