"use client";
import Link from "next/link";
import Image from "next/image";
import { AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 left-0 bg-background border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              alt="uniport logo"
              src={"/images/logo.jpg"}
              width={60}
              height={60}
              className="rounded-full"
            />
            {/* <GraduationCap className="h-6 w-6" /> */}
            <h1 className="md:text-xl text-primary-main font-bold">
              CSC Department Result Portal
            </h1>
          </div>

          {/* menu bar */}
          <div className="relative md:hidden">
            <div
              onClick={() => {
                setIsOpen(true);
              }}
              className="relative z-20 cursor-pointer"
            >
              <AlignLeft className="text-primary-main text-3xl" />
            </div>
            {/*  */}
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } duration-200 ease-in-out fixed top-0 left-0 w-screen h-screen bg-black/50`}
            />
            <div
              className={`${
                isOpen ? "right-0 z-30 opacity-100" : "opacity-0 -right-full"
              } duration-200 ease-in-out py-5 px-3 bg-white text-primary-main rounded-md absolute top-0 flex flex-col items-center gap-4`}
            >
              <div className="w-full flex">
                <span
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="text-xl text-gray-500 font-semibold underline cusor-pointer ml-auto"
                >
                  close
                </span>
              </div>
              <Link href="/student-login">
                <Button className="text-lg font-semibold" variant="ghost">
                  Student Login
                </Button>
              </Link>
              <Link href="/admin-login">
                <Button className="text-lg font-semibold" variant="ghost">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>

          {/* desktop */}
          <div className="hidden md:flex items-center gap-4 text-primary-main">
            <Link className="text-xl" href="/student-login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/admin-login">
              <Button className="text-lg font-semibold" variant="ghost">
                Admin Login
              </Button>
            </Link>
            {/* <Link className="text-xl" href="/contact">
              <Button variant="ghost">Contact</Button>
            </Link> */}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-main">
            University of Port Harcourt
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary-main">
            Computer Science Department Result Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            Access your academic results securely and efficiently
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-main">
                Student Portal
              </CardTitle>
              <CardDescription>
                Check your semester results and academic progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access your results for all semesters. View your CGPA, course
                grades, and academic standing.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Link href="/student-login" className="w-full">
                <Button className="bg-primary-main hover:bg-primary-main/85 cursor-pointer w-full">
                  Verify Email and Login
                </Button>
              </Link>
              <Link href="/signup" className="w-full">
                <Button
                  variant="outline"
                  className="w-full text-primary-main cursor-pointer"
                >
                  New Student? Register
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary-main">Admin Portal</CardTitle>
              <CardDescription>
                Upload and manage student results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload semester results, manage student records, and generate
                reports for all levels (100-400).
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin-login" className="w-full">
                <Button className="bg-primary-main hover:bg-primary-main/85 cursor-pointer w-full">
                  Admin Login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Department of Computer Science. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}
