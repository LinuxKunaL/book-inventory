type TStudents = {
  search: string;
  class: string;
  section: string;
  school: string;
  page: number;
};

type TSchools = {
  search: string;
  date: string;
  page: number;
};

type TCourses = {
  category: string;
  difficulty: string;
  search: string;
  page: number;
};

type TQuiz = {
  page: number;
  search: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "passed" | "failed";
};

export type TFilterQuery = {
  student: TStudents;
  school: TSchools;
  course: TCourses;
  quiz: TQuiz;
};

export type TProgressRequest = {
  courseId: string;
  currentLesson: string;
  currentVideoTime: number;
  completedLessons: string[];
  courseCompleted: boolean;
  currentLessonTitle: string;
  lessonsLength: number;
  watchSeconds:number;
};

export type TQuizResultRequest = {
  quizId: string;
  answers: { [key: string]: number };
  completedAt: string;
  timeSpent: number;
};
