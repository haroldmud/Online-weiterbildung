"use client"
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/Client";
import GlobeComp from "@/components/globe";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children, session
}: Readonly<{
  children: React.ReactNode,
  session: any
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout session={session}>{children}</ClientLayout>
      </body>
    </html>
  );
}
