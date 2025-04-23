"use client";
import { createContext, useState, useContext } from "react";

interface ContextProps {
  isStudentNavOpen: boolean;
  setIsStudentNavOpen: (isOpen: boolean) => void;
  isAdminNavOpen: boolean;
  setIsAdminNavOpen: (isAdminOpen: boolean) => void;
  appIsLoading: boolean;
  setAppIsLoading: (appLoading: boolean) => void;
  currentLevel: string;
}

const appContext = createContext<ContextProps | undefined>(undefined);
export function ContextProvider({ children }: { children: React.ReactNode }) {
  const currentLevel = "400";
  const [isStudentNavOpen, setIsStudentNavOpen] = useState<boolean>(false);
  const [isAdminNavOpen, setIsAdminNavOpen] = useState<boolean>(false);
  const [appIsLoading, setAppIsLoading] = useState<boolean>(false);
  return (
    <appContext.Provider
      value={{
        isStudentNavOpen,
        setIsStudentNavOpen,
        isAdminNavOpen,
        setIsAdminNavOpen,
        appIsLoading,
        setAppIsLoading,
        currentLevel,
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
