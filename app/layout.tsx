import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GenieEdu",
  description: "Tutor marketplace for AP / A-level / IB STEM"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
