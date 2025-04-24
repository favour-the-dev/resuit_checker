export interface RegisterFormData {
  firstName: string;
  lastName: string;
  level: number;
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
  firstName: string;
  lastName: string;
  level: number;
  matricNumber: string;
  email: string;
  role: "student" | "admin"; // assuming roles can vary
  isVerified: boolean;
  };

  export type CourseStatus = "completed" | "in-progress" | "not-registered";

  export interface AdminData{
    email: string
    password: string
  }

  export type CourseResult = {
    matricNumber: string;
    level: number;
    semester: "First" | "Second";
    courseCode: string;
    score: number;
    grade: "A" | "B" | "C" | "D" | "E" | "F" | null;
  };

  export type specificResult = {
    level: number
    semester: string
  }

  export type CourseResultData = {
    _id: string | null;
    level: number | null;
    semester: "First" | "Second" | null;
    courseCode: string | null;
    score: number | null;
    grade: "A" | "B" | "C" | "D" | "E" | "F" | null;
    createdAt: string | null; // or Date | null if you parse dates
    updatedAt: string | null;
  };

  export interface allResultData {
    _id: string;
    student: string;
    matricNumber: string;
    level: number;
    semester: "First" | "Second";
    courseCode: string;
    score: number;
    grade: "A" | "B" | "C" | "D" | "E" | "F" | null;
    createdAt: string;
    updatedAt: string;
  }