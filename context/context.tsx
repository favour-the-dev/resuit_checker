"use client";
import { createContext, useState, useContext } from "react";

interface ContextProps {
  isStudentNavOpen: boolean;
  setIsStudentNavOpen: (isOpen: boolean) => void;
  studentData?: {
    userName?: string;
    userEmail?: string;
    userLevel?: string;
    userMatNo?: string;
    userStudentId?: string;
  };
  setStudentData?: React.Dispatch<
    React.SetStateAction<ContextProps["studentData"]>
  >;
}

const appContext = createContext<ContextProps | undefined>(undefined);
export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [studentData, setStudentData] = useState<ContextProps["studentData"]>({
    userName: "Favour Odili",
    userEmail: "favourto91@gmail.com",
    userLevel: "400 Level",
    userMatNo: "u2021/5570098",
    userStudentId: "CSC/400/u2021/5570098",
  });
  const [isStudentNavOpen, setIsStudentNavOpen] = useState<boolean>(false);
  return (
    <appContext.Provider
      value={{
        isStudentNavOpen,
        setIsStudentNavOpen,
        studentData,
        setStudentData,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

// Custom hook for easy access
export const useApp = () => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
