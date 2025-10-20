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
  type?: "plain";
};

type TCourses = {
  category: string;
  difficulty: string;
  search: string;
  page: number;
};

type TQuiz = {
  search: string;
  class: string;
  difficulty: string;
  page: number;
};

type TNotifications = {
  type: string;
  page: number;
};

type TParticipant = {
  status: string;
  classStandard: string;
  page: number;
};

export type TFilterQuery = {
  student: TStudents;
  school: TSchools;
  course: TCourses;
  participant: TParticipant;
  quiz: TQuiz;
  notification: TNotifications;
};
