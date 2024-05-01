"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);
  return (
    <>
      <main>
        <div className="flex items-start min-h-screen">
          <div className="w-1/5 h-full fixed">
            <Sidebar />
          </div>
          <div className="w-4/5 h-full px-12 ml-[20vw]">
            <Navbar />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
