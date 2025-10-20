export const AdminCredentials = {
  username: "tejas wagh",
  gmail: "admintejas@gmail.com",
  password: "123456",
};
// Type
export type TAchievement = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
};

// Course Achievements
export const CourseAchievements: TAchievement[] = [
  {
    _id: "68a4015a4593d5030e42dc39",
    title: "Knowledge Seeker",
    description: "Completed 5 courses",
    icon: "🥇",
    condition: "complete_5_courses",
  },
  {
    _id: "68a4015a4593d5030e42dc3b",
    title: "Course Master",
    description: "Completed 10 courses",
    icon: "🏆",
    condition: "complete_10_courses",
  },
  {
    _id: "68a4015a4593d5030e42dc4f",
    title: "First Step",
    description: "Completed your first course",
    icon: "🏅",
    condition: "complete_1_course",
  },
];

// Quiz Achievements
export const QuizAchievements: TAchievement[] = [
  {
    _id: "68a4015a4593d5030e42dc3e",
    title: "Quiz Challenger",
    description: "Completed 10 quizzes",
    icon: "🎯",
    condition: "quiz_10_complete",
  },
  {
    _id: "68a4015a4593d5030e42dc51",
    title: "First Attempt",
    description: "Completed your first quiz",
    icon: "📝",
    condition: "quiz_1_complete",
  },
  {
    _id: "68a41bae7e837b8f5f950a5a",
    title: "Quiz Master",
    description: "Score 95% or higher in a quiz",
    icon: "🎓",
    condition: "quiz_95_percent",
  },
];

// Streak Achievements
export const StreakAchievements: TAchievement[] = [
  {
    _id: "68a4015a4593d5030e42dc48",
    title: "Consistency Starter",
    description: "Study 3 days in a row",
    icon: "📅",
    condition: "streak_3_days",
  },
  {
    _id: "68a4015a4593d5030e42dc4a",
    title: "One Week Streak",
    description: "Study 7 days in a row",
    icon: "📆",
    condition: "streak_7_days",
  },
  {
    _id: "68a4015a4593d5030e42dc4c",
    title: "Learning Beast",
    description: "Study 30 days in a row",
    icon: "🔥",
    condition: "streak_30_days",
  },
];

// Hours Spent Achievements
export const HoursSpentAchievements: TAchievement[] = [
  {
    _id: "68a4015a4593d5030e42dc42",
    title: "Time Investor",
    description: "Spend 5 hours learning",
    icon: "⏰",
    condition: "course_hours_5",
  },
  {
    _id: "68a4015a4593d5030e42dc44",
    title: "Dedicated Learner",
    description: "Spend 20 hours learning",
    icon: "📚",
    condition: "course_hours_20",
  },
  {
    _id: "68a4015a4593d5030e42dc46",
    title: "Learning Marathon",
    description: "Spend 50 hours learning",
    icon: "🔥",
    condition: "course_hours_50",
  },
];

// Final merged Achievements
export const AchievementsData: TAchievement[] = [
  ...CourseAchievements,
  ...QuizAchievements,
  ...StreakAchievements,
  ...HoursSpentAchievements,
];
