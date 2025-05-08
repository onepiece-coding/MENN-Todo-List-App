import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/common";
import { ToastProvider } from "@/components/feedback";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My ToDo App",
  description: "A secure, accessible todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <Header />
        <ToastProvider>
          <main className="px-4">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
