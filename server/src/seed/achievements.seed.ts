import { MAchievement } from "../models/achievement.model";
import { AchievementsData } from "./data";

export async function seedAchievements() {
  try {
    AchievementsData.forEach(async (achievement) => {
      const exists = await MAchievement.findOne({
        condition: achievement.condition,
      });
      if (!exists) {
        await MAchievement.create(achievement);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
