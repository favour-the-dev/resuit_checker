"use client";
import { useState, useEffect } from "react";
import AuthService from "@/lib/api/auth";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentSidebar } from "@/app/components/students-sidebar";
import { useApp } from "@/context/context";
import DashboardHeader from "@/app/components/dashboardHeader";
import { ProfileData } from "@/lib/types/types";
import Loading from "@/app/components/loading";
import { availableSemesters } from "@/lib/data";
export default function StudentDashboard() {
  const { appIsLoading, setAppIsLoading, currentLevel } = useApp();
  const semestersToShow = availableSemesters.filter(
    (levelSem) => parseInt(levelSem.level) <= parseInt(currentLevel)
  );
  const flattenedSemesters = semestersToShow.flatMap((level) =>
    level.semesters.map((sem) => ({
      label: sem.name,
      value: `${sem.code} Level ${sem.name}`,
    }))
  );

  // Get the first available semester or fallback
  const initialSemesterValue = flattenedSemesters[0]?.value || "";

  const [selectedSemester, setSelectedSemester] =
    useState(initialSemesterValue);
  const [studentProfile, setStudentProfile] = useState<ProfileData>();
  async function getStudentProfile() {
    setAppIsLoading(true);
    try {
      const profileData = await AuthService.getStudentProfile();
      console.log(profileData);
      setStudentProfile(profileData);
      setTimeout(() => {
        setAppIsLoading(false);
      }, 1500);
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
        <DashboardHeader role="student" userName={studentProfile?.email} />
        <main className="flex-1 container py-6 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-primary-main text-2xl font-bold">
                Welcome, {studentProfile?.email}
              </h2>
              <p className="text-muted-foreground">
                Matric Number: {studentProfile?.matricNumber} | Level: 400
              </p>
            </div>
            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent className="">
                {semestersToShow.map((level) => (
                  <div key={level.level}>
                    <h2 className="font-semibold text-lg mb-2 text-primary-main">
                      {level.level} Level
                    </h2>
                    <ul>
                      {level.semesters.map((sem) => (
                        <SelectItem
                          value={`${sem.code} Level ${sem.name}`}
                          className=""
                        >
                          {sem.code} Level {sem.name}
                        </SelectItem>
                      ))}
                    </ul>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Current CGPA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.75</div>
                <p className="text-xs text-muted-foreground">First Class</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Current GPA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.85</div>
                <p className="text-xs text-muted-foreground">
                  1st Semester 2023/2024
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96</div>
                <p className="text-xs text-muted-foreground">
                  Out of 160 required
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="results">
            <TabsList className="mb-4">
              <TabsTrigger value="results">Semester Results</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Results for {selectedSemester}</CardTitle>
                  <CardDescription>
                    Your academic performance for the selected semester
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Course Code</th>
                          <th className="text-left py-3 px-4">Course Title</th>
                          <th className="text-left py-3 px-4">Credit Units</th>
                          <th className="text-left py-3 px-4">Grade</th>
                          <th className="text-left py-3 px-4">Grade Point</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC301</td>
                          <td className="py-3 px-4">
                            Data Structures and Algorithms
                          </td>
                          <td className="py-3 px-4">3</td>
                          <td className="py-3 px-4">A</td>
                          <td className="py-3 px-4">5.0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC303</td>
                          <td className="py-3 px-4">
                            Object-Oriented Programming
                          </td>
                          <td className="py-3 px-4">3</td>
                          <td className="py-3 px-4">A</td>
                          <td className="py-3 px-4">5.0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC305</td>
                          <td className="py-3 px-4">Operating Systems</td>
                          <td className="py-3 px-4">3</td>
                          <td className="py-3 px-4">B</td>
                          <td className="py-3 px-4">4.0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC307</td>
                          <td className="py-3 px-4">
                            Database Management Systems
                          </td>
                          <td className="py-3 px-4">3</td>
                          <td className="py-3 px-4">A</td>
                          <td className="py-3 px-4">5.0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC309</td>
                          <td className="py-3 px-4">Computer Networks</td>
                          <td className="py-3 px-4">3</td>
                          <td className="py-3 px-4">B</td>
                          <td className="py-3 px-4">4.0</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="bg-muted/50">
                          <td colSpan={2} className="py-3 px-4 font-bold">
                            Semester Summary
                          </td>
                          <td className="py-3 px-4 font-bold">15</td>
                          <td className="py-3 px-4"></td>
                          <td className="py-3 px-4 font-bold">GPA: 3.85</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Download Result</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transcript">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Transcript</CardTitle>
                  <CardDescription>
                    Your complete academic record
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Level 100 (2020/2021)
                      </h3>
                      <Separator className="mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            1st Semester
                          </h4>
                          <p className="text-sm">GPA: 3.65</p>
                          <p className="text-sm">Credits: 18</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            2nd Semester
                          </h4>
                          <p className="text-sm">GPA: 3.70</p>
                          <p className="text-sm">Credits: 18</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">
                        Level 200 (2021/2022)
                      </h3>
                      <Separator className="mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            1st Semester
                          </h4>
                          <p className="text-sm">GPA: 3.75</p>
                          <p className="text-sm">Credits: 18</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            2nd Semester
                          </h4>
                          <p className="text-sm">GPA: 3.80</p>
                          <p className="text-sm">Credits: 18</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">
                        Level 300 (2022/2023)
                      </h3>
                      <Separator className="mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            1st Semester
                          </h4>
                          <p className="text-sm">GPA: 3.85</p>
                          <p className="text-sm">Credits: 15</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            2nd Semester
                          </h4>
                          <p className="text-sm">GPA: 3.90</p>
                          <p className="text-sm">Credits: 15</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Request Official Transcript</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
