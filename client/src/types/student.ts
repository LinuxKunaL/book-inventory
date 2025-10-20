export type TStudentMe = {
  studentName: string;
  admissionNumber: string;
  school: {
    schoolName: string;
  };
  classStandard: string;
  section: string;
  gender: "male" | "female";
  email: string;
  mobileNumber: string;
  notificationCount: number;
  streak: number;
};

export type TAchievements = {
  achievement: {
    title: string;
    description: string;
    icon: string;
    condition: string;
  };
  unlockDate: Date;
};

export type TOverviewData = {
  gridOverview: {
    _id: string;
    overallProgress: number;
    courses: {
      completed: number;
      totalHours: number;
    };
    achievements: number;
  };

  progressCourses: {
    _id: string;
    course: {
      _id: string;
      title: string;
    };
    progress: number;
    currentLessonTitle: string;
  }[];

  achievements: TAchievements[];

  quizResults: {
    _id: string;
    title: string;
    description: string;
    timeLimit: number;
    difficulty: "beginner" | "intermediate" | "advanced" | string;
  }[];
};

export type TStudentViewData = {
  personalInfo: {
    address: {
      state: string;
      city: string;
      street: string;
      pinCode: string;
    };
    studentName: string;
    admissionNumber: string;
    dateOfBirth: string;
    school: {
      schoolName: string;
    };
    classStandard: string;
    section: string;
    gender: string;
    parentName: string;
    isRegistered: boolean;
    createdAt: string;
    email: string;
    mobileNumber: string;
    streak: number;
  };

  academicInfo: {
    overallProgress: number;
    courseCompleted: number;
    quizzesProgressed: string;
    averageScore: number;
  };

  achievements: {
    achievement: {
      title: string;
      icon: string;
    };
    unlockDate: string;
  }[];

  recentActivities: {
    student: string;
    name: string;
    description: string;
    color: string | any;
    createdAt: string;
  }[];
};
