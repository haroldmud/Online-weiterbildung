// components/ClientLayout.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { ReactNode } from "react";
import { Session } from "next-auth";

interface ClientLayoutProps {
  children: ReactNode;
  session: Session;
}

export default function ClientLayout({ children, session }: ClientLayoutProps) {
  return (
    <SessionProvider session={session}>
      <SessionProvider session={session}>
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
        </SessionProvider>
    </SessionProvider>
  );
}
