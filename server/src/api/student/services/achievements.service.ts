import { Types } from "mongoose";
import { MStudentStats } from "../../../models/studentStats.model";
import { pushActivity } from "./activity.service";

const pushAchievement = async (
  userId: Types.ObjectId,
  achievementId: string
) => {
  await MStudentStats.findOneAndUpdate(
    {
      student: userId,
    },
    {
      $push: {
        achievements: {
          achievement: new Types.ObjectId(achievementId),
          unlockDate: new Date(),
        },
      },
    }
  );
};

const unlockCourseAchievements = async (
  userId: Types.ObjectId,
  completedCourses: number
) => {
  try {
    if (completedCourses === 1) {
      pushAchievement(userId, "68a4015a4593d5030e42dc4f");
      pushActivity(
        userId,
        "Course",
        "Unlocked 'First Step' Achievement",
        "green"
      );
    }
    if (completedCourses === 5) {
      pushAchievement(userId, "68a4015a4593d5030e42dc39");
      pushActivity(
        userId,
        "Course",
        "Unlocked 'Knowledge Seeker' Achievement",
        "indigo"
      );
    }
    if (completedCourses === 10) {
      pushAchievement(userId, "68a4015a4593d5030e42dc3b");
      pushActivity(
        userId,
        "Course",
        "Unlocked 'Course Master' Achievement",
        "blue"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const unlockQuizAchievements = async (
  userId: Types.ObjectId,
  completedQuizzes: number
) => {
  try {
    if (completedQuizzes === 1) {
      pushAchievement(userId, "68a4015a4593d5030e42dc51");
      pushActivity(
        userId,
        "quiz",
        "Unlocked 'First Attempt' Achievement",
        "red"
      );
    }
    if (completedQuizzes === 10) {
      pushAchievement(userId, "68a4015a4593d5030e42dc3e");
      pushActivity(
        userId,
        "quiz",
        "Unlocked 'Quiz Challenger' Achievement",
        "pink"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const unlockQuizScoreAchievements = async (
  userId: Types.ObjectId,
  score: number
) => {
  try {
    if (score >= 95) {
      pushAchievement(userId, "68a4015a4593d5030e42dc40");
      pushActivity(
        userId,
        "quiz",
        "Unlocked 'Quiz Master' Achievement",
        "yellow"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const unlockCourseHoursAchievements = async (
  userId: Types.ObjectId,
  seconds: number
) => {
  try {
    // for 5 hours
    if (seconds >= 18000) {
      pushAchievement(userId, "68a4015a4593d5030e42dc42");
      pushActivity(
        userId,
        "timeSpent",
        "Unlocked 'Time Investor' Achievement",
        "yellow"
      );
    }
    // fo5r 20 hours
    if (seconds >= 72000) {
      pushAchievement(userId, "68a4015a4593d5030e42dc44");
      pushActivity(
        userId,
        "timeSpent",
        "Unlocked 'Dedicated Learner' Achievement",
        "red"
      );
    }
    // for 50 hours
    if (seconds >= 180000) {
      pushAchievement(userId, "68a4015a4593d5030e42dc46");
      pushActivity(
        userId,
        "timeSpent",
        "Unlocked 'Learning Marathon' Achievement",
        "green"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const unlockStreakAchievements = async (
  userId: Types.ObjectId,
  days: number
) => {
  try {
    if (days >= 3) {
      pushAchievement(userId, "68a4015a4593d5030e42dc48");
      pushActivity(
        userId,
        "other",
        "Unlocked 'Consistency Starter' Achievement",
        "gray"
      );
    }
    if (days >= 7) {
      pushAchievement(userId, "68a4015a4593d5030e42dc4a");
      pushAchievement(userId, "68a4015a4593d5030e42dc48");
      pushActivity(
        userId,
        "other",
        "Unlocked 'One Week Streak' Achievement",
        "crimson"
      );
    }
    if (days >= 30) {
      pushAchievement(userId, "68a4015a4593d5030e42dc4c");
      pushActivity(
        userId,
        "other",
        "Unlocked 'Learning Beast' Achievement",
        "blue"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  unlockCourseAchievements,
  unlockQuizAchievements,
  unlockQuizScoreAchievements,
  unlockCourseHoursAchievements,
  unlockStreakAchievements,
};
