"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Download,
  FileSpreadsheet,
  LogOut,
  Plus,
  Upload,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSidebar } from "@/app/components/admin-sidebar";
import { useApp } from "@/context/context";
export default function AdminDashboard() {
  const { appIsLoading } = useApp();
  const [selectedLevel, setSelectedLevel] = useState("300");
  const [selectedSemester, setSelectedSemester] = useState(
    "1st Semester 2023/2024"
  );

  return (
    <div className="h-screen overflow-y-hidden flex relative">
      <AdminSidebar />

      <div
        className={`flex-1 flex flex-col ${
          appIsLoading ? "relative overflow-y-hidden" : "overflow-y-scroll"
        }`}
      >
        <header className="border-b">
          <div className="container py-4 px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Admin User</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link href="/">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 container py-6 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <p className="text-muted-foreground">
                Manage student results and records
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add New Student</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload Results</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">
                  Across all levels
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Results Uploaded
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Uploads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
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
              <SelectContent>
                <SelectItem value="1st Semester 2023/2024">
                  1st Semester 2023/2024
                </SelectItem>
                <SelectItem value="2nd Semester 2022/2023">
                  2nd Semester 2022/2023
                </SelectItem>
                <SelectItem value="1st Semester 2022/2023">
                  1st Semester 2022/2023
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="results">
            <TabsList className="mb-4">
              <TabsTrigger value="results">Results Management</TabsTrigger>
              <TabsTrigger value="students">Student Records</TabsTrigger>
            </TabsList>
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>
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
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Course Code</th>
                          <th className="text-left py-3 px-4">Course Title</th>
                          <th className="text-left py-3 px-4">Lecturer</th>
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
                          <td className="py-3 px-4">Dr. Johnson</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Uploaded
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC303</td>
                          <td className="py-3 px-4">
                            Object-Oriented Programming
                          </td>
                          <td className="py-3 px-4">Prof. Williams</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Uploaded
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC305</td>
                          <td className="py-3 px-4">Operating Systems</td>
                          <td className="py-3 px-4">Dr. Smith</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Uploaded
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC307</td>
                          <td className="py-3 px-4">
                            Database Management Systems
                          </td>
                          <td className="py-3 px-4">Dr. Brown</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Pending
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" className="h-8">
                              <Upload className="h-4 w-4 mr-2" />
                              <span>Upload</span>
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CSC309</td>
                          <td className="py-3 px-4">Computer Networks</td>
                          <td className="py-3 px-4">Prof. Davis</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Pending
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" className="h-8">
                              <Upload className="h-4 w-4 mr-2" />
                              <span>Upload</span>
                            </Button>
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
                      <span>Download Template</span>
                    </Button>
                    <Button className="flex items-center gap-2">
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
                  <CardTitle>
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
                        <tr className="border-b">
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
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <User className="h-4 w-4" />
                                <span className="sr-only">View Profile</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="sr-only">View Results</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CS/2020/002</td>
                          <td className="py-3 px-4">Jane Smith</td>
                          <td className="py-3 px-4">jane.smith@example.com</td>
                          <td className="py-3 px-4">3.92</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <User className="h-4 w-4" />
                                <span className="sr-only">View Profile</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="sr-only">View Results</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CS/2020/003</td>
                          <td className="py-3 px-4">Michael Johnson</td>
                          <td className="py-3 px-4">michael.j@example.com</td>
                          <td className="py-3 px-4">3.45</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <User className="h-4 w-4" />
                                <span className="sr-only">View Profile</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="sr-only">View Results</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CS/2020/004</td>
                          <td className="py-3 px-4">Sarah Williams</td>
                          <td className="py-3 px-4">sarah.w@example.com</td>
                          <td className="py-3 px-4">3.88</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <User className="h-4 w-4" />
                                <span className="sr-only">View Profile</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="sr-only">View Results</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">CS/2020/005</td>
                          <td className="py-3 px-4">David Brown</td>
                          <td className="py-3 px-4">david.b@example.com</td>
                          <td className="py-3 px-4">3.65</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <User className="h-4 w-4" />
                                <span className="sr-only">View Profile</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span className="sr-only">View Results</span>
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
                    <Button className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Manage Students</span>
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
