"use client";
import { Mail, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DashboardHeader from "@/app/components/dashboardHeader";
import { StudentSidebar } from "@/app/components/students-sidebar";
import { useApp } from "@/context/context";
import { useState, useEffect } from "react";
import { ProfileData } from "@/lib/types/types";
import AuthService from "@/lib/api/auth";
import Loading from "@/app/components/loading";

export default function StudentProfilePage() {
  // Static profile data
  const { appIsLoading, setAppIsLoading } = useApp();
  const [studentProfile, setStudentProfile] = useState<ProfileData>();

  async function getStudentProfile() {
    setAppIsLoading(true);
    try {
      const profileData = await AuthService.getStudentProfile();
      console.log(profileData);
      setStudentProfile(profileData);
      setTimeout(() => {
        setAppIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    getStudentProfile();
  }, []);

  return (
    <div className="h-screen overflow-y-hidden flex relative">
      <StudentSidebar />

      <div
        className={`flex-1 flex flex-col ${
          appIsLoading ? "relative overflow-y-hidden" : "overflow-y-scroll"
        }`}
      >
        {appIsLoading && <Loading />}
        <DashboardHeader role="student" userName={studentProfile?.firstName} />
        <main className="flex-1 container py-6 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary-main">
                  My Profile
                </h2>
                <p className="text-muted-foreground">
                  View your personal information
                </p>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-primary-main">
                  Personal Information
                </CardTitle>

                <CardDescription>Your basic profile details</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-12 w-12" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 w-full">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            First Name
                          </p>
                          <p className="text-base">
                            {studentProfile?.firstName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Last Name
                          </p>
                          <p className="text-base">
                            {studentProfile?.lastName}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Email
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p className="text-base">{studentProfile?.email}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Level
                          </p>
                          <p className="text-base">
                            {studentProfile?.level} Level
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Matriculation Number
                          </p>
                          <p className="text-base">
                            {studentProfile?.matricNumber}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Department
                          </p>
                          <p className="text-base">Computer Science</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Faculty
                          </p>
                          <p className="text-base">Computing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Your contact details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone Number
                        </p>
                        <p className="text-base">{profile.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Date of Birth
                        </p>
                        <p className="text-base">{profile.dateOfBirth}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Address
                      </p>
                      <p className="text-base">{profile.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}

            {/* <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Summary</CardTitle>
                  <CardDescription>
                    Your academic performance overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Current CGPA
                      </p>
                      <p className="text-2xl font-bold">3.75</p>
                      <p className="text-xs text-muted-foreground">
                        First Class
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Completed Credits
                      </p>
                      <p className="text-2xl font-bold">96</p>
                      <p className="text-xs text-muted-foreground">
                        Out of 160 required
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Current Semester
                      </p>
                      <p className="text-2xl font-bold">1st</p>
                      <p className="text-xs text-muted-foreground">
                        2023/2024 Academic Year
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
