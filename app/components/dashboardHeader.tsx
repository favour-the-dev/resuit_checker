"use client";
import Link from "next/link";
import { ChevronDown, LogOut, User, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/context";
import { usePathname } from "next/navigation";

interface DashboardHeaderProps {
  role: string;
  userName?: string;
}
function DashboardHeader({ role, userName }: DashboardHeaderProps) {
  const { setIsStudentNavOpen, setIsAdminNavOpen } = useApp();
  function handleMenuClick() {
    if (role === "student") {
      setIsStudentNavOpen(true);
    } else if (role === "admin") {
      setIsAdminNavOpen(true);
    }
  }
  const pathname: string | undefined = usePathname().split("/").pop();
  return (
    <>
      <header className="border-b">
        <div className="container py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlignLeft
              onClick={() => handleMenuClick()}
              className="h-6 w-6 text-3xl md:hidden"
            />
            <h1 className="text-xl font-bold capitalize text-primary-main">
              {role} {pathname}
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-primary-main hover:text-primary-main flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span className="capitalize hidden md:block">{userName}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4 text-primary-main" />
                <Link
                  href={`/${role}/profile`}
                  className="text-primary-main hover:text-primary-main"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4 text-primary-main" />
                <Link
                  href="/"
                  className="text-primary-main hover:text-primary-main"
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
