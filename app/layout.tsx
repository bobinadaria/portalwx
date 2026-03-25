import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/lib/site-context";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portal WX — Design System",
  description: "Component library and design reference for Portal WX (Sharry)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
