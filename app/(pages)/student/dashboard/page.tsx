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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentSidebar } from "@/app/components/students-sidebar";
import { useApp } from "@/context/context";
import DashboardHeader from "@/app/components/dashboardHeader";
import { ProfileData } from "@/lib/types/types";
import Loading from "@/app/components/loading";
import ResultsService from "@/lib/api/results";
import { CourseResultData } from "@/lib/types/types";
import { exportToExcel } from "@/utilis/exportToExcel";

interface exportData {
  courseCode: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "E" | "F" | null;
}
export default function StudentDashboard() {
  const { appIsLoading, setAppIsLoading } = useApp();
  const [studentProfile, setStudentProfile] = useState<ProfileData>();
  const [result, setResult] = useState<CourseResultData[]>([]);
  const [level, setSelectedLevel] = useState<number>(100);
  const [semester, setSelectedSemester] = useState("First");
  const [readyToExportResult, setReadyToExport] = useState<exportData[]>([]);

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

  const getResult = async () => {
    if (level !== null && semester !== "") {
      try {
        const resultData = await ResultsService.getStudentResult({
          level,
          semester,
        });

        setResult(resultData);

        const mappedExportData = resultData.map((res) => ({
          courseCode: res.courseCode as string,
          score: res.score as number,
          grade: res.grade,
        }));

        setReadyToExport(mappedExportData); // replace instead of appending

        console.log("Fetched resultData:", resultData);
        console.log("Mapped for export:", mappedExportData);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  useEffect(() => {
    getStudentProfile();
  }, []);
  useEffect(() => {
    getResult();
  }, [level, semester]);

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-primary-main text-2xl font-bold">
                Welcome NACOSITE, {studentProfile?.firstName} {""}
                {studentProfile?.lastName}
              </h2>
              <p className="text-muted-foreground my-2">
                ONE NACOS!.....you know the rest
              </p>
              <p className="text-muted-foreground">
                Matric Number: {studentProfile?.matricNumber} | Level: 400
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Select
                value={`${level}`}
                onValueChange={(value) => setSelectedLevel(Number(value))}
              >
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                </SelectContent>
              </Select>

              <Select value={semester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent className="text-primary-main">
                  <SelectItem
                    value="First"
                    className="text-primary-main hover:text-primary-main/95"
                  >
                    First Semester
                  </SelectItem>

                  <SelectItem
                    value="Second"
                    className="text-primary-main hover:text-primary-main/95"
                  >
                    Second Semester
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Released Results
                </CardTitle>
                <CardTitle className="text-xs text-primary/50 font-medium">
                  {semester} semester
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{result?.length}</div>
                <p className="text-xs text-muted-foreground">
                  Out of 8 required
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="results">
            <TabsList className="mb-4 hidden">
              <TabsTrigger value="results">Semester Results</TabsTrigger>
              <TabsTrigger value="transcript" className="">
                Transcript
              </TabsTrigger>
            </TabsList>
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Results for {level} level {semester} semester
                  </CardTitle>
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
                          {/* <th className="text-left py-3 px-4">Credit Units</th> */}
                          <th className="text-left py-3 px-4">Score</th>
                          <th className="text-left py-3 px-4">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(result) && result?.length > 0 ? (
                          result.map((res, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 px-4">{res.courseCode}</td>
                              <td className="py-3 px-4">{res.score}</td>
                              <td className="py-3 px-4">{res.grade}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={3}
                              className="text-center py-4 text-muted-foreground"
                            >
                              No results available for this level and semester.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      {/* <tfoot>
                        <tr className="bg-muted/50">
                          <td colSpan={2} className="py-3 px-4 font-bold">
                            Semester Summary
                          </td>
                          <td className="py-3 px-4 font-bold">15</td>
                          <td className="py-3 px-4"></td>
                          <td className="py-3 px-4 font-bold">GPA: 3.85</td>
                        </tr>
                      </tfoot> */}
                    </table>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() =>
                        exportToExcel(
                          readyToExportResult,
                          `${level}-level-${semester}-semester-results.xlsx`
                        )
                      }
                    >
                      <FileText className="h-4 w-4" />
                      <span>Download Result</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* <TabsContent value="transcript">
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
            </TabsContent> */}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
