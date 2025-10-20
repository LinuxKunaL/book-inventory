export type TCourse = {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  visibility: "public" | "private";
  thumbnail: string;
  lessons: {
    title: string;
    description: string;
    id: string;
    video: {
      name: string | File;
      duration: string;
    };
    resources: {
      name: string | File;
      size: string;
    }[];
  }[];
  lessonsLength: number;
  studentEnrolled: number;
};
