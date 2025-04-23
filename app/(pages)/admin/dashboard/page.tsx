"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, FileSpreadsheet, Upload, User, Users } from "lucide-react";

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
import DashboardHeader from "@/app/components/dashboardHeader";
import { AdminSidebar } from "@/app/components/admin-sidebar";
import { useApp } from "@/context/context";
import { availableSemesters } from "@/lib/data";

export default function AdminDashboard() {
  const { appIsLoading, currentLevel } = useApp();
  const [selectedLevel, setSelectedLevel] = useState(currentLevel);
  const [selectedSemester, setSelectedSemester] = useState("First Semester");
  return (
    <div className="h-screen overflow-y-hidden flex relative">
      <AdminSidebar />

      <div
        className={`flex-1 flex flex-col ${
          appIsLoading ? "relative overflow-y-hidden" : "overflow-y-scroll"
        }`}
      >
        <DashboardHeader role="admin" userName="admin" />

        <main className="flex-1 container py-6 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-main">
                Admin Dashboard
              </h2>
              <p className="text-muted-foreground">
                Manage student results and records
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add New Student</span>
              </Button> */}
              <Link href={"/admin/upload-results"}>
                <Button
                  variant="outline"
                  className="text-primary-main hover:text-primary-main/95  flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Results</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary-main">
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary-main">
                  1,245
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all levels
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary-main">
                  Results Uploaded
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary-main">24</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary-main">
                  Pending Uploads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary-main">3</div>
                <p className="text-xs text-muted-foreground">
                  Courses awaiting results
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
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

            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent className="text-primary-main">
                <SelectItem
                  value="First Semester"
                  className="text-primary-main hover:text-primary-main/95"
                >
                  First Semester
                </SelectItem>

                <SelectItem
                  value="Second Semester"
                  className="text-primary-main hover:text-primary-main/95"
                >
                  Second Semester
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="results">
            <TabsList className="mb-4">
              <TabsTrigger value="results" className="text-primary-main">
                Results Management
              </TabsTrigger>
              <TabsTrigger value="students" className="text-primary-main">
                Student Records
              </TabsTrigger>
            </TabsList>
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary-main">
                    Results for {selectedLevel} Level - {selectedSemester}
                  </CardTitle>
                  <CardDescription>
                    Manage and upload results for the selected level and
                    semester
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b text-primary-main">
                          <th className="text-left py-3 px-4">Course Code</th>
                          <th className="text-left py-3 px-4">Course Title</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC301</td>
                          <td className="py-3 px-4">
                            Data Structures and Algorithms
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Uploaded
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Link
                                className=""
                                href={"/viewResult/?course=csc301"}
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                >
                                  <FileSpreadsheet className="h-4 w-4" />
                                  <span className="">View Results</span>
                                </Button>
                              </Link>
                              <Link href={"/admin/upload-result?course=Csc301"}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="">Upload</span>
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-end">
                    {/* <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Template</span>
                    </Button> */}
                    <Button className="flex items-center gap-2 bg-primary-main hover:bg-primary-main">
                      <Upload className="h-4 w-4" />
                      <span>Batch Upload Results</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary-main">
                    Student Records for {selectedLevel} Level
                  </CardTitle>
                  <CardDescription>
                    View and manage student records for the selected level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b text-primary-main">
                          <th className="text-left py-3 px-4">Student ID</th>
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">CGPA</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">CS/2020/001</td>
                          <td className="py-3 px-4">John Doe</td>
                          <td className="py-3 px-4">john.doe@example.com</td>
                          <td className="py-3 px-4">3.75</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {/* <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <User className="h-4 w-4" />
                                <span className="sr-only">View Profile</span>
                              </Button> */}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="">View Results</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export Student List</span>
                    </Button>
                    {/* <Button className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Manage Students</span>
                    </Button> */}
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
