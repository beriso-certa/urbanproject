import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urban Creative Studio",
  description: "Urban – Content creation, strategy & storytelling studio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-dark text-white antialiased">{children}</body>
    </html>
  );
}