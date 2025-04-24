"use client";
import Link from "next/link";
import { BookOpen, Home, User, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/context";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const { isAdminNavOpen, setIsAdminNavOpen } = useApp();
  const pathname = usePathname();
  return (
    <div
      className={`absolute ${
        isAdminNavOpen ? "left-0 w-64" : "-left-full"
      } md:static w-0 md:w-64 flex h-screen flex-col border-r bg-background md:bg-muted/40 duration-300 ease-in-out`}
    >
      <div className="w-full flex h-14 items-center justify-between border-b p-4">
        <Link
          href="/student/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Image
            src="/images/logo.jpg"
            alt="logo"
            width={30}
            height={30}
            className=""
          />
          <span className="text-primary-main">Admin Portal</span>
        </Link>

        <div
          onClick={() => setIsAdminNavOpen(false)}
          className="text-primary-main text-2xl md:hidden"
        >
          <X />
        </div>
      </div>
      <div
        onClick={() => {
          setTimeout(() => {
            setIsAdminNavOpen(false);
          }, 1000);
        }}
        className="flex-1 overflow-auto py-2"
      >
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link href="/admin/dashboard">
            <Button
              variant="ghost"
              className={`${
                pathname.includes("dashboard")
                  ? "bg-muted text-primary-main"
                  : "text-muted-foreground"
              } cursor-pointer w-full justify-start gap-2 hover:text-primary-main`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/upload-results">
            <Button
              variant="ghost"
              className={`${
                pathname.includes("upload-results")
                  ? "bg-muted text-primary-main"
                  : "text-muted-foreground"
              } cursor-pointer w-full justify-start gap-2 hover:text-primary-main`}
            >
              <BookOpen className="h-4 w-4" />
              Upload Results
            </Button>
          </Link>
          {/* <Separator className="my-2" />
          <Link href="/admin/profile">
            <Button
              variant="ghost"
              className={`${
                pathname.includes("profile")
                  ? "bg-muted text-primary-main"
                  : "text-muted-foreground"
              } cursor-pointer w-full justify-start gap-2 hover:text-primary-main`}
            >
              <User className="h-4 w-4" />
              Admin Profile
            </Button>
          </Link> */}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-main">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-primary-main text-sm font-medium leading-none">
              Admin
            </p>
            <p className="text-xs text-muted-foreground">
              Admin@uniport.edu.ng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
