"use client";

import { useState } from "react";
import { BookOpen, Info } from "lucide-react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { StudentSidebar } from "@/app/components/students-sidebar";
import { coursesData } from "@/lib/courses";
import DashboardHeader from "@/app/components/dashboardHeader";
import { useApp } from "@/context/context";
import Loading from "@/app/components/loading";

type courseStatus =
  | "registered"
  | "not-registered"
  | "completed"
  | "in-progress";

export default function CoursesPage() {
  const { currentLevel, appIsLoading, setAppIsLoading } = useApp();
  const [selectedLevel, setSelectedLevel] = useState("400"); // Default to 300 level (current student level)

  // Get courses for the selected level
  const levelCourses =
    coursesData.find((level) => level.level === selectedLevel) ||
    coursesData[0];
  // Get status badge color based on course status
  const getStatusBadge = (status: courseStatus) => {
    switch (status) {
      case "registered":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            Registered
          </Badge>
        );
      case "not-registered":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 hover:bg-gray-100"
          >
            Not Registered
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            In Progress
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="h-screen overflow-y-hidden flex relative">
      <StudentSidebar />

      <div
        className={`flex-1 flex flex-col ${
          appIsLoading ? "relative overflow-y-hidden" : "overflow-y-scroll"
        }`}
      >
        {appIsLoading && <Loading />}
        <DashboardHeader role="student" userName="favour Odili" />

        <main className="flex-1 container py-6 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Course Catalog</h2>
              <p className="text-muted-foreground">
                View courses offered per semester for each level
              </p>
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 Level</SelectItem>
                <SelectItem value="200">200 Level</SelectItem>
                <SelectItem value="300">300 Level</SelectItem>
                <SelectItem value="400">400 Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                {selectedLevel} Level Courses
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {parseInt(selectedLevel) === parseInt(currentLevel)
                ? "You are currently in this level. Make sure to register for all required courses."
                : parseInt(selectedLevel) < parseInt(currentLevel)
                ? "You have completed this level."
                : "You will take these courses in the future."}
            </p>
          </div>

          <Tabs defaultValue={levelCourses.semesters[0].semester}>
            <TabsList className="mb-4">
              {levelCourses.semesters.map((semester) => (
                <TabsTrigger key={semester.semester} value={semester.semester}>
                  {semester.semester}
                </TabsTrigger>
              ))}
            </TabsList>

            {levelCourses.semesters.map((semester) => (
              <TabsContent key={semester.semester} value={semester.semester}>
                <Card>
                  <CardHeader>
                    <CardTitle>{semester.semester} Courses</CardTitle>
                    <CardDescription>
                      {selectedLevel === "300" &&
                      semester.semester === "1st Semester"
                        ? "You are currently taking these courses"
                        : selectedLevel === "300" &&
                          semester.semester === "2nd Semester"
                        ? "Upcoming courses for this academic year"
                        : selectedLevel === "100" || selectedLevel === "200"
                        ? "Completed courses from previous levels"
                        : "Future courses you will take"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Course Code</th>
                            <th className="text-left py-3 px-4">
                              Course Title
                            </th>
                            <th className="text-left py-3 px-4">
                              Credit Units
                            </th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {semester.courses.map((course) => (
                            <tr key={course.code} className="border-b">
                              <td className="py-3 px-4">{course.code}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1">
                                  {course.title}
                                  {course.prerequisites &&
                                    course.prerequisites.length > 0 && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p className="font-medium text-xs">
                                              Prerequisites:
                                            </p>
                                            <ul className="text-xs list-disc pl-4">
                                              {course.prerequisites.map(
                                                (prereq) => (
                                                  <li key={prereq}>{prereq}</li>
                                                )
                                              )}
                                            </ul>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {course.creditUnits}
                              </td>
                              <td className="py-3 px-4">
                                {getStatusBadge(course.status)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Course Registration Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Total Courses Completed
                    </p>
                    <p className="text-xl font-bold">20</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Courses In Progress
                    </p>
                    <p className="text-xl font-bold">5</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Pending Registration
                    </p>
                    <p className="text-xl font-bold">5</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Total Credit Units
                    </p>
                    <p className="text-xl font-bold">96/160</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
