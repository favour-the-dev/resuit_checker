"use client";
import Link from "next/link";
import { Home, User, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/context";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ProfileData } from "@/lib/types/types";
import AuthService from "@/lib/api/auth";

export function StudentSidebar() {
  const {
    isStudentNavOpen,
    setIsStudentNavOpen,
    appIsLoading,
    setAppIsLoading,
  } = useApp();
  const pathname = usePathname();
  const [studentProfile, setStudentProfile] = useState<ProfileData>();

  async function getStudentProfile() {
    setAppIsLoading(true);
    try {
      const profileData = await AuthService.getStudentProfile();
      console.log(profileData);
      setStudentProfile(profileData);
      setTimeout(() => {
        setAppIsLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    getStudentProfile();
  }, []);
  return (
    <div
      className={`absolute ${
        isStudentNavOpen ? "left-0 w-64" : "-left-full"
      } md:static w-0 md:w-64 flex h-screen flex-col border-r bg-background md:bg-muted/40 duration-300 ease-in-out`}
    >
      <div className="w-full flex h-14 items-center justify-between border-b p-4">
        <Link
          href="/student/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Image
            src="/images/logo.jpg"
            alt="logo"
            width={30}
            height={30}
            className=""
          />
          <span className="text-primary-main">Student Portal</span>
        </Link>

        <div
          onClick={() => setIsStudentNavOpen(false)}
          className="text-primary-main text-2xl md:hidden"
        >
          <X />
        </div>
      </div>
      <div
        onClick={() => {
          setTimeout(() => {
            setIsStudentNavOpen(false);
          }, 1000);
        }}
        className="flex-1 overflow-auto py-2"
      >
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link href="/student/dashboard">
            <Button
              variant="ghost"
              className={`${
                pathname.includes("dashboard")
                  ? "bg-muted text-primary-main"
                  : "text-muted-foreground"
              } cursor-pointer w-full justify-start gap-2 hover:text-primary-main`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          {/* <Link href="/student/courses">
            <Button
              variant="ghost"
              className={`${
                pathname.includes("courses")
                  ? "bg-muted text-primary-main"
                  : "text-muted-foreground"
              } cursor-pointer w-full justify-start gap-2 hover:text-primary-main`}
            >
              <BookOpen className="h-4 w-4" />
              Courses
            </Button>
          </Link> */}
          <Separator className="my-2" />
          <Link href="/student/profile">
            <Button
              variant="ghost"
              className={`${
                pathname.includes("profile")
                  ? "bg-muted text-primary-main"
                  : "text-muted-foreground"
              } cursor-pointer w-full justify-start gap-2 hover:text-primary-main`}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-main">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-primary-main text-sm font-medium leading-none">
              {appIsLoading ? (
                "Loading..."
              ) : (
                <span>
                  {studentProfile?.firstName} {studentProfile?.lastName}
                </span>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {appIsLoading ? (
                "Loading..."
              ) : (
                <span>{studentProfile?.matricNumber}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
