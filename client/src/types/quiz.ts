export type TQuestion = {
  id: string;
  options: string[];
  question: string;
  correctAnswer: number;
  explanation: string;
};

export type TQuizData = {
  _id?: string;
  title: string;
  description: string;
  visibility: "public" | "private";
  timeLimit: number;
  passingScore: number;
  difficulty: string;
  assignedGroups: string[];
  questions: TQuestion[];
  questionsLength?: number;
};

export type TResultQuiz = {
  student: string;
  quiz: TQuizData;
  result: {
    correct: number;
    wrong: number;
    notAttempted: number;
    totalQuestions: number;
  };
  questionsReview: (TQuestion & { studentAnswer: number })[];
  status: string;
  score: number;
  timeSpent: number;
  date: string;
};

export type TAttemptedQuiz = {
  _id: string;
  student: string;
  quiz: {
    _id: string;
    title: string;
    description: string;
    visibility: "public" | "private";
    timeLimit: number;
    difficulty: string;
    passingScore: number;
    questionsLength: number;
  };
  questionsReview: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    studentAnswer: string;
    explanation: string;
  }[];
  status: "failed" | "passed";
  score: number;
  timeSpent: number;
  completedAt: string;
};
export type TQuizParticipants = {
  _id: string;
  student: {
    _id: string;
    studentName: string;
    school: {
      schoolName: string;
    };
    classStandard: string;
    section: string;
    email: string;
  };
  result: {
    correct: number;
    wrong: number;
    notAttempted: number;
    totalQuestions: number;
  };
  status: string;
  score: number;
  timeSpent: number;
  completedAt: Date;
};
