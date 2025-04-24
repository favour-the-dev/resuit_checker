"use client";

import type React from "react";
import { useState } from "react";
import { Edit, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSidebar } from "@/app/components/admin-sidebar";
import DashboardHeader from "@/app/components/dashboardHeader";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { useApp } from "@/context/context";
import { CourseResult } from "@/lib/types/types";
import ResultsService from "@/lib/api/results";
// Define the result interface

export default function UploadResultsPage() {
  const [isUploading, setIsUploading] = useState(false);
  const { appIsLoading } = useApp();

  // Form state
  const [result, setResult] = useState<CourseResult>({
    matricNumber: "",
    level: 100,
    semester: "First",
    courseCode: "",
    score: 0,
    grade: null,
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter state for results view
  const [filters, setFilters] = useState({
    level: "100",
    semester: "First",
    courseCode: "CSC101",
  });

  // State for results data
  const [results, setResults] = useState<CourseResult[]>();

  // State for edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<CourseResult | null>(null);

  // State for delete dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingResult, setDeletingResult] = useState<CourseResult | null>(
    null
  );

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === "score") {
      const score = Number.parseInt(value);
      setResult((prev) => ({
        ...prev,
        [name]: score,
        // Automatically calculate grade based on score
        grade: calculateGrade(score),
      }));
    } else {
      setResult((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string | number) => {
    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setResult((prev) => ({ ...prev, [name]: value }));
  };

  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate grade based on score
  const calculateGrade = (score: number): "A" | "B" | "C" | "D" | "E" | "F" => {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 45) return "D";
    if (score >= 40) return "E";
    return "F";
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!result.matricNumber.trim()) {
      newErrors.matricNumber = "Matriculation number is required";
    }
    if (!result.courseCode.trim()) {
      newErrors.courseCode = "Course code is required";
    }
    if (result.score < 0 || result.score > 100) {
      newErrors.score = "Score must be between 0 and 100";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsUploading(true);
    try {
      const response = await ResultsService.uploadStudentResult(result);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw Error;
    }
    // Simulate API call to upload result
    setTimeout(() => {
      setIsUploading(false);
      // Add the new result to the results array
      const newResult: CourseResult = {
        matricNumber: result.matricNumber,
        level: result.level,
        semester: result.semester,
        courseCode: result.courseCode,
        score: result.score,
        grade: result.grade,
      };

      setResults([newResult]);

      // Show success message
      toast("Result Uploaded successfully");

      // Clear form for next entry
      setResult({
        matricNumber: result.matricNumber, // Keep the matric number for multiple entries
        level: result.level, // Keep the level
        semester: result.semester, // Keep the semester
        courseCode: "",
        score: 0,
        grade: "A",
      });
    }, 1500);
  };

  // Get course name by code
  const getCourseNameByCode = (code: string): string => {
    const courses: Record<string, string> = {
      CSC101: "Introduction to Computer Science",
      CSC102: "Introduction to Computer Systems",
      CSC103: "Introduction to Programming",
      CSC104: "Data Structures",
      MTH101: "Elementary Mathematics I",
    };
    return courses[code] || code;
  };

  // Open edit dialog
  const openEditDialog = (result: CourseResult) => {
    setEditingResult(result);
    setIsEditDialogOpen(true);
  };

  // Handle edit form input changes
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "score") {
      const score = Number.parseInt(value);
      setEditingResult((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [name]: score,
          grade: calculateGrade(score),
        };
      });
    } else {
      setEditingResult((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  // Handle edit form select changes
  const handleEditSelectChange = (name: string, value: string | number) => {
    setEditingResult((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Save edited result
  const saveEditedResult = () => {
    if (!editingResult) return;

    // Update the result in the results array
    // setResults((prev) =>
    //   prev.map((r) => (r.id === editingResult.id ? editingResult : r))
    // );

    // Close the dialog
    setIsEditDialogOpen(false);

    // Show success message
    toast("SUCCESS");
  };

  // Open delete dialog
  const openDeleteDialog = (result: CourseResult) => {
    setDeletingResult(result);
    setIsDeleteDialogOpen(true);
  };

  // Delete result
  const deleteResult = () => {
    if (!deletingResult) return;
    setIsDeleteDialogOpen(false);
    toast("Result deleted successful");
  };

  const filteredResults = (results || []).filter(
    (r) =>
      r.level.toString() === filters.level &&
      r.semester === filters.semester &&
      r.courseCode === filters.courseCode
  );

  return (
    <div className="h-screen overflow-y-hidden flex relative">
      <AdminSidebar />

      <div
        className={`flex-1 flex flex-col ${
          appIsLoading ? "relative overflow-y-hidden" : "overflow-y-scroll"
        }`}
      >
        <DashboardHeader role="admin" userName={"admin"} />

        <main className="flex-1 container py-6 px-6">
          <Tabs defaultValue="upload">
            <TabsList className="hidden mb-4">
              <TabsTrigger value="upload">Upload Result</TabsTrigger>
              <TabsTrigger value="view">View Results</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <div className="grid gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Individual Result</CardTitle>
                      <CardDescription>
                        Enter result details for a single student
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        id="uploadForm"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="matricNumber">
                              Matriculation Number
                            </Label>
                            <Input
                              id="matricNumber"
                              name="matricNumber"
                              placeholder="e.g. U2023/123456"
                              value={result.matricNumber}
                              onChange={handleInputChange}
                              className={
                                errors.matricNumber ? "border-destructive" : ""
                              }
                            />
                            {errors.matricNumber && (
                              <p className="text-xs text-destructive">
                                {errors.matricNumber}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="level">Level</Label>
                            <Select
                              value={result.level.toString()}
                              onValueChange={(value) =>
                                handleSelectChange(
                                  "level",
                                  Number.parseInt(value)
                                )
                              }
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
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="semester">Semester</Label>
                            <Select
                              value={result.semester}
                              onValueChange={(value) =>
                                handleSelectChange("semester", value)
                              }
                            >
                              <SelectTrigger id="semester">
                                <SelectValue placeholder="Select semester" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="First">
                                  First Semester
                                </SelectItem>
                                <SelectItem value="Second">
                                  Second Semester
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="courseCode">Course Code</Label>
                            <Input
                              id="courseCode"
                              name="courseCode"
                              placeholder="Ges 100.1"
                              value={result.courseCode}
                              onChange={handleInputChange}
                              className={
                                errors.courseCode ? "border-destructive" : ""
                              }
                            />
                            {errors.courseCode && (
                              <p className="text-xs text-destructive">
                                {errors.courseCode}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="score">Score</Label>
                            <Input
                              id="score"
                              name="score"
                              type="number"
                              min="0"
                              max="100"
                              placeholder="Enter score (0-100)"
                              value={result.score || ""}
                              onChange={handleInputChange}
                              className={
                                errors.score ? "border-destructive" : ""
                              }
                            />
                            {errors.score && (
                              <p className="text-xs text-destructive">
                                {errors.score}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="grade">
                              Grade (Auto-calculated)
                            </Label>
                            <Input
                              id="grade"
                              name="grade"
                              value={`${result.grade}`}
                              readOnly
                              className="bg-muted"
                            />
                            <p className="text-xs text-muted-foreground">
                              Grade is automatically calculated from score
                            </p>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                          setResult({
                            matricNumber: "",
                            level: 100,
                            semester: "First",
                            courseCode: "",
                            score: 0,
                            grade: "A",
                          });
                          setErrors({});
                        }}
                      >
                        Clear Form
                      </Button>
                      <Button
                        type="submit"
                        form="uploadForm"
                        disabled={isUploading}
                        className="flex items-center gap-2 bg-primary-main hover:bg-primary-main"
                      >
                        {isUploading ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            <span>Upload Result</span>
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="view">
              <Card>
                <CardHeader>
                  <CardTitle>View and Manage Results</CardTitle>
                  <CardDescription>
                    View, update, or delete student results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="filterLevel">Level</Label>
                        <Select
                          value={filters.level}
                          onValueChange={(value) =>
                            handleFilterChange("level", value)
                          }
                        >
                          <SelectTrigger id="filterLevel">
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
                        <Label htmlFor="filterSemester">Semester</Label>
                        <Select
                          value={filters.semester}
                          onValueChange={(value) =>
                            handleFilterChange("semester", value)
                          }
                        >
                          <SelectTrigger id="filterSemester">
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="First">
                              First Semester
                            </SelectItem>
                            <SelectItem value="Second">
                              Second Semester
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="filterCourse">Course</Label>
                        <Select
                          value={filters.courseCode}
                          onValueChange={(value) =>
                            handleFilterChange("courseCode", value)
                          }
                        >
                          <SelectTrigger id="filterCourse">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CSC101">
                              CSC101 - Introduction to Computer Science
                            </SelectItem>
                            <SelectItem value="CSC102">
                              CSC102 - Introduction to Computer Systems
                            </SelectItem>
                            <SelectItem value="CSC103">
                              CSC103 - Introduction to Programming
                            </SelectItem>
                            <SelectItem value="CSC104">
                              CSC104 - Data Structures
                            </SelectItem>
                            <SelectItem value="MTH101">
                              MTH101 - Elementary Mathematics I
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="text-left py-3 px-4 font-medium">
                                Matric Number
                              </th>
                              <th className="text-left py-3 px-4 font-medium">
                                Student Name
                              </th>
                              <th className="text-left py-3 px-4 font-medium">
                                Score
                              </th>
                              <th className="text-left py-3 px-4 font-medium">
                                Grade
                              </th>
                              <th className="text-left py-3 px-4 font-medium">
                                Uploaded At
                              </th>
                              <th className="text-left py-3 px-4 font-medium">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {filteredResults.length > 0 ? (
                              filteredResults.map((result, index) => (
                                <tr key={index} className="hover:bg-muted/30">
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openEditDialog(result)}
                                        title="Edit Result"
                                      >
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openDeleteDialog(result)}
                                        title="Delete Result"
                                      >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                        <span className="sr-only">Delete</span>
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={6}
                                  className="py-6 text-center text-muted-foreground"
                                >
                                  No results found for the selected filters.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Showing {filteredResults.length} results for{" "}
                        {filters.courseCode} ({filters.level} Level,{" "}
                        {filters.semester} Semester)
                      </p>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Export Results</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Edit Result Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Student Result</DialogTitle>
                <DialogDescription>
                  {/* Update the result for {editingResult?.studentName} (
                  {editingResult?.matricNumber}) */}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="editScore">Score</Label>
                    <Input
                      id="editScore"
                      name="score"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter score (0-100)"
                      value={editingResult?.score || ""}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editGrade">Grade (Auto-calculated)</Label>
                    <Input
                      id="editGrade"
                      name="grade"
                      value={editingResult?.grade || ""}
                      readOnly
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Grade is automatically calculated from score
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="editLevel">Level</Label>
                    <Select
                      value={editingResult?.level.toString() || "100"}
                      onValueChange={(value) =>
                        handleEditSelectChange("level", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger id="editLevel">
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
                    <Label htmlFor="editSemester">Semester</Label>
                    <Select
                      value={editingResult?.semester || "First"}
                      onValueChange={(value) =>
                        handleEditSelectChange("semester", value)
                      }
                    >
                      <SelectTrigger id="editSemester">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="First">First Semester</SelectItem>
                        <SelectItem value="Second">Second Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={saveEditedResult}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Result Dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Student Result</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the result for{" "}
                  {/* {deletingResult?.studentName} ({deletingResult?.matricNumber}) */}
                  in {deletingResult?.courseCode}?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={deleteResult}>
                  Delete Result
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
