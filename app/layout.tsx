import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ContextProvider } from "@/context/context";

export const metadata: Metadata = {
  title: "CSC RESULT PORTAL",
  description: "upload, manage and view your results",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main>
          <ContextProvider>{children}</ContextProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
