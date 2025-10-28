"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentStats_model_1 = require("../../../models/studentStats.model");
const activity_service_1 = require("./activity.service");
const pushAchievement = async (userId, achievementId) => {
    await studentStats_model_1.MStudentStats.findOneAndUpdate({
        student: userId,
    }, {
        $push: {
            achievements: {
                achievement: new mongoose_1.Types.ObjectId(achievementId),
                unlockDate: new Date(),
            },
        },
    });
};
const unlockCourseAchievements = async (userId, completedCourses) => {
    try {
        if (completedCourses === 1) {
            pushAchievement(userId, "68a4015a4593d5030e42dc4f");
            (0, activity_service_1.pushActivity)(userId, "Course", "Unlocked 'First Step' Achievement", "green");
        }
        if (completedCourses === 5) {
            pushAchievement(userId, "68a4015a4593d5030e42dc39");
            (0, activity_service_1.pushActivity)(userId, "Course", "Unlocked 'Knowledge Seeker' Achievement", "indigo");
        }
        if (completedCourses === 10) {
            pushAchievement(userId, "68a4015a4593d5030e42dc3b");
            (0, activity_service_1.pushActivity)(userId, "Course", "Unlocked 'Course Master' Achievement", "blue");
        }
    }
    catch (error) {
        console.log(error);
    }
};
const unlockQuizAchievements = async (userId, completedQuizzes) => {
    try {
        if (completedQuizzes === 1) {
            pushAchievement(userId, "68a4015a4593d5030e42dc51");
            (0, activity_service_1.pushActivity)(userId, "quiz", "Unlocked 'First Attempt' Achievement", "red");
        }
        if (completedQuizzes === 10) {
            pushAchievement(userId, "68a4015a4593d5030e42dc3e");
            (0, activity_service_1.pushActivity)(userId, "quiz", "Unlocked 'Quiz Challenger' Achievement", "pink");
        }
    }
    catch (error) {
        console.log(error);
    }
};
const unlockQuizScoreAchievements = async (userId, score) => {
    try {
        if (score >= 95) {
            pushAchievement(userId, "68a4015a4593d5030e42dc40");
            (0, activity_service_1.pushActivity)(userId, "quiz", "Unlocked 'Quiz Master' Achievement", "yellow");
        }
    }
    catch (error) {
        console.log(error);
    }
};
const unlockCourseHoursAchievements = async (userId, seconds) => {
    try {
        // for 5 hours
        if (seconds >= 18000) {
            pushAchievement(userId, "68a4015a4593d5030e42dc42");
            (0, activity_service_1.pushActivity)(userId, "timeSpent", "Unlocked 'Time Investor' Achievement", "yellow");
        }
        // fo5r 20 hours
        if (seconds >= 72000) {
            pushAchievement(userId, "68a4015a4593d5030e42dc44");
            (0, activity_service_1.pushActivity)(userId, "timeSpent", "Unlocked 'Dedicated Learner' Achievement", "red");
        }
        // for 50 hours
        if (seconds >= 180000) {
            pushAchievement(userId, "68a4015a4593d5030e42dc46");
            (0, activity_service_1.pushActivity)(userId, "timeSpent", "Unlocked 'Learning Marathon' Achievement", "green");
        }
    }
    catch (error) {
        console.log(error);
    }
};
const unlockStreakAchievements = async (userId, days) => {
    try {
        if (days >= 3) {
            pushAchievement(userId, "68a4015a4593d5030e42dc48");
            (0, activity_service_1.pushActivity)(userId, "other", "Unlocked 'Consistency Starter' Achievement", "gray");
        }
        if (days >= 7) {
            pushAchievement(userId, "68a4015a4593d5030e42dc4a");
            pushAchievement(userId, "68a4015a4593d5030e42dc48");
            (0, activity_service_1.pushActivity)(userId, "other", "Unlocked 'One Week Streak' Achievement", "crimson");
        }
        if (days >= 30) {
            pushAchievement(userId, "68a4015a4593d5030e42dc4c");
            (0, activity_service_1.pushActivity)(userId, "other", "Unlocked 'Learning Beast' Achievement", "blue");
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = {
    unlockCourseAchievements,
    unlockQuizAchievements,
    unlockQuizScoreAchievements,
    unlockCourseHoursAchievements,
    unlockStreakAchievements,
};
