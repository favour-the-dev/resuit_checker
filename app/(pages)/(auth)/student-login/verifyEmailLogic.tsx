"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import Image from "next/image";
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
import { toast } from "sonner";
import AuthService from "@/lib/api/auth";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get email from URL params (would be passed from signup)
  const emailFromParams = searchParams.get("email") || "";

  const [email, setEmail] = useState<string>(emailFromParams);
  const [loginCode, setVerificationCode] = useState("");
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationStep, setVerificationStep] = useState<
    "request" | "verify" | "success"
  >("request");
  const [error, setError] = useState("");

  // Handle countdown for resending code
  useEffect(() => {
    console.log(codeSent);
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRequestCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsRequestingCode(true);

    try {
      const res = await AuthService.requestLoginCode(email);
      console.log(res);
      setTimeout(() => {
        setIsRequestingCode(false);
        setCodeSent(true);
        setVerificationStep("verify");
        setCountdown(30);
        toast(`Verification code sent to ${emailFromParams}`);
      }, 500);
    } catch (error) {
      setIsRequestingCode(false);
      console.log(error);
      toast(`error:${error}`);
      throw error;
    }
  };

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!loginCode.trim()) {
      setError("Please enter the verification code");
      return;
    }
    setIsVerifying(true);
    try {
      const res = await AuthService.verifyLoginCode({ email, loginCode });
      localStorage.setItem("userToken", res);
      setTimeout(() => {
        setIsVerifying(false);
        if (loginCode !== "") {
          setVerificationStep("success");
          toast(`Your email: ${email} has been verified successfully`);
        } else {
          setError("Invalid verification code. Please try again.");
        }
      }, 500);
    } catch (error) {
      setIsVerifying(false);
      console.log(error);
      toast(`error:${error}`);
      throw error;
    }
  };

  const handleResendCode = () => {
    if (countdown > 0) return;
    setIsRequestingCode(true);
    setTimeout(() => {
      setIsRequestingCode(false);
      setCountdown(30); // Reset countdown
      toast("Verification code resent");
    }, 1500);
  };

  const redirectToDashboard = () => {
    router.push("/student/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-primary-main">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div
              className={`${
                verificationStep === "success" && "bg-primary/10"
              } p-3 rounded-full mb-2`}
            >
              {verificationStep === "success" ? (
                <CheckCircle className="h-6 w-6 text-primary" />
              ) : (
                <Image
                  alt="logo"
                  src={"/images/logo.jpg"}
                  width={60}
                  height={60}
                />
              )}
            </div>
            <CardTitle className="text-xl text-center  text-primary-main">
              <h2 className="text-3xl mb-4">Student Log In</h2>
              {verificationStep === "request" && "Verify Your Email"}
              {verificationStep === "verify" && "Enter Verification Code"}
              {verificationStep === "success" && "Email Verified"}
            </CardTitle>
            <CardDescription>
              {verificationStep === "request" &&
                "We need to verify your email address before you can log in"}
              {verificationStep === "verify" &&
                `We've sent a 6-digit code to ${email}`}
              {verificationStep === "success" &&
                "Your email has been verified successfully"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {verificationStep === "request" && (
              <form onSubmit={handleRequestCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary-main">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${error ? "border-destructive" : ""}`}
                    />
                  </div>
                  {error && <p className="text-xs text-destructive">{error}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary-main hover:bg-primary-main/90 cursor-pointer duration-200 ease-linear"
                  disabled={isRequestingCode}
                >
                  {isRequestingCode
                    ? "Sending Code..."
                    : "Send Verification Code"}
                </Button>
              </form>
            )}

            {verificationStep === "verify" && (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-primary-main" htmlFor="loginCode">
                    Verification Code
                  </Label>
                  <Input
                    id="loginCode"
                    placeholder="Enter 6-digit code"
                    value={loginCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className={error ? "border-destructive" : ""}
                    maxLength={6}
                  />
                  {error && <p className="text-xs text-destructive">{error}</p>}

                  <div className="text-xs text-muted-foreground">
                    Didn't receive a code?{" "}
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className={`text-primary hover:underline ${
                        countdown > 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={countdown > 0 || isRequestingCode}
                    >
                      {countdown > 0
                        ? `Resend in ${countdown}s`
                        : "Resend code"}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary-main hover:bg-primary-main/90 cursor-pointer duration-200 ease-linear"
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify Email"}
                </Button>
              </form>
            )}

            {verificationStep === "success" && (
              <div className="space-y-4">
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-primary mb-2" />
                  <p className="text-sm">
                    Your email has been verified successfully. You can log in to
                    your account.
                  </p>
                </div>

                <Button
                  onClick={redirectToDashboard}
                  className="w-full bg-primary-main hover:bg-primary-main/90 cursor-pointer duration-200 ease-linear"
                >
                  Proceed to Dashboard
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              {verificationStep !== "success" && (
                <>
                  Don't have an Account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary-main hover:underline"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
