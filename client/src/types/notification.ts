export type TNotification = {
  _id: string;
  type: string;
  private: {
    school: {
      schoolName: string;
    };
    classStandard: string;
    section: string;
  };
  message: string;
  createdAt: string;
  link?: string;
  course?: string;
  quiz?: string;
};
