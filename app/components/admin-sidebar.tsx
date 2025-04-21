"use client";

import Link from "next/link";
import {
  FileSpreadsheet,
  GraduationCap,
  Home,
  Settings,
  Upload,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AdminSidebar() {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <GraduationCap className="h-5 w-5" />
          <span>Admin Portal</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/upload-results">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Upload className="h-4 w-4" />
              Upload Results
            </Button>
          </Link>
          <Link href="/admin/students">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Students
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Courses
            </Button>
          </Link>
          <Separator className="my-2" />
          <Link href="/admin/profile">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium leading-none">Admin User</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
