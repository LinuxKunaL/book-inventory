export type TStudentData = {
  _id?: string;
  studentName: string;
  admissionNumber: string;
  dateOfBirth: string;
  classStandard: string;
  section: string;
  gender: string;
  parentName: string;
  mobileNumber?: string;
  email?: string;
  school?: {
    _id: string;
    schoolName: string;
  };
  address?: {
    state: string;
    city: string;
    street: string;
    pinCode: string;
  };
};
