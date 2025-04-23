export interface RegisterFormData {
    matricNumber: string;
    email: string;
  }

  export interface verifyLoginCodeDate{
    email: string
    loginCode: string
  }

  export type ProfileData = {
    success: boolean;
    _id: string;
    matricNumber: string;
    email: string;
    role: 'student';
    isVerified: boolean;
  };

  export type CourseStatus = "completed" | "in-progress" | "not-registered";

  export interface AdminData{
    email: string
    password: string
  }