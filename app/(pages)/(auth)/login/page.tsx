"use client";
import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, User } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "student";
  const [role, setRole] = useState<string>(defaultRole);
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/student/dashboard");
      toast("Login successful");
    }, 1500);
  };

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/dashboard");
      toast("Admin login successful");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 left-0 bg-background">
        <div className="container mx-auto py-4 px-4 flex items-center">
          <Link href="/" className="text-primary-main flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="p-3 rounded-full mb-2">
              {/* <GraduationCap className="h-6 w-6 text-primary" /> */}
              <Image
                alt="uniport log"
                src={"/images/logo.jpg"}
                width={50}
                height={50}
              />
            </div>
            <CardTitle className="text-2xl text-primary-main">
              Sign in
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue={role}
              onValueChange={setRole}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger
                  value="student"
                  className="text-primary-main cursor-pointer"
                >
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="text-primary-main cursor-pointer"
                >
                  Admin
                </TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-primary-main">
                      Student ID
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-primary-main" />
                      <Input
                        id="studentId"
                        placeholder="Enter your student ID"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="studentPassword"
                      className="text-primary-main"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-primary-main" />
                      <Input
                        id="studentPassword"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-primary-main hover:bg-primary-main/85 cursor-pointer w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminId" className="text-primary-main">
                      Admin ID
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-primary-main" />
                      <Input
                        id="adminId"
                        placeholder="Enter your admin ID"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="adminPassword"
                      className="text-primary-main"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-primary-main" />
                      <Input
                        id="adminPassword"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-primary-main w-full hover:bg-primary-main/85 cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              Forgot your password?{" "}
              <Link
                href="/reset-password"
                className="text-primary-main hover:underline"
              >
                Reset it here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
