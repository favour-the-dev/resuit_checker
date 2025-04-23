"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";
import { AdminData } from "@/lib/types/types";
import AuthService from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const defaultRole = "admin";
  const [role, setRole] = useState<string>(defaultRole);
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useState<AdminData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!admin.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (admin.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!admin.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(admin.email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) return;

    try {
      const res = await AuthService.loginAdmin(admin);
      if (res) {
        console.log(res);
        localStorage.setItem("userToken", res);
        setTimeout(() => {
          setIsLoading(false);
          router.push("/admin/dashboard");
          toast("admin login successful");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
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
              Admin Log in
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
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminId" className="text-primary-main">
                      Email Address:
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-primary-main" />
                      <Input
                        id="adminId"
                        name="email"
                        placeholder="Enter your admin Email"
                        value={admin?.email}
                        required
                        className="pl-10"
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
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
                        name="password"
                        type="password"
                        placeholder="Enter your admin password"
                        required
                        value={admin?.password}
                        onChange={handleChange}
                        className="pl-10"
                      />
                      {errors.password && (
                        <p className="text-xs text-destructive">
                          {errors.password}
                        </p>
                      )}
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
              Are you a student?{" "}
              <Link
                href="/student-login"
                className="text-primary-main hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
