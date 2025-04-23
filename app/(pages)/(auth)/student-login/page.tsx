import { Suspense } from "react";
import VerifyEmailPage from "./verifyEmailLogic";

export default function StudentLoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
}
