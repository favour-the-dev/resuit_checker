"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Download, FileSpreadsheet, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import DashboardHeader from "@/app/components/dashboardHeader";
import { AdminSidebar } from "@/app/components/admin-sidebar";
import { useApp } from "@/context/context";
export default function UploadResultsPage() {
  const { appIsLoading } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast("Results uploaded successfully");
    }, 2000);
  };

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
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary-main">
                  Upload Student Results
                </CardTitle>
                <CardDescription>
                  Upload results for a specific course, level, and semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select
                        value={selectedLevel}
                        onValueChange={setSelectedLevel}
                        required
                      >
                        <SelectTrigger id="level">
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

                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={selectedSemester}
                        onValueChange={setSelectedSemester}
                        required
                      >
                        <SelectTrigger id="semester">
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select
                      value={selectedCourse}
                      onValueChange={setSelectedCourse}
                      required
                    >
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSC301">
                          CSC301 - Data Structures and Algorithms
                        </SelectItem>
                        <SelectItem value="CSC303">
                          CSC303 - Object-Oriented Programming
                        </SelectItem>
                        <SelectItem value="CSC305">
                          CSC305 - Operating Systems
                        </SelectItem>
                        <SelectItem value="CSC307">
                          CSC307 - Database Management Systems
                        </SelectItem>
                        <SelectItem value="CSC309">
                          CSC309 - Computer Networks
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Result File (Excel or CSV)</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload an Excel or CSV file with student results. Make
                      sure to use the correct template.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Template</span>
                    </Button>
                    <Button
                      type="submit"
                      className="flex items-center gap-2"
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4" />
                      <span>
                        {isUploading ? "Uploading..." : "Upload Results"}
                      </span>
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-muted-foreground">
                  <h4 className="font-medium mb-1">Instructions:</h4>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Download the template for the selected course</li>
                    <li>Fill in the student IDs and their respective scores</li>
                    <li>Save the file and upload it using the form above</li>
                    <li>
                      The system will automatically calculate grades based on
                      the department's grading system
                    </li>
                    <li>Review the results before finalizing</li>
                  </ol>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Need help with bulk uploads?{" "}
                    <Link
                      href="/admin/help"
                      className="text-primary hover:underline"
                    >
                      View tutorial
                    </Link>
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
