"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selected, setSelected] = useState("all");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <section className="flex flex-col justify-between h-[100vh]">
        {/* <section>
         <GlobeComp selected={selected} />
        </section> */}
        <section>
          <Header />
        </section>
        <section className="flex justify-center">
          <section className="max-w-[1000px] w-full">
           {children}
          </section>
        </section>
        <Footer />
      </section>
      </body>
    </html>
  );
}
