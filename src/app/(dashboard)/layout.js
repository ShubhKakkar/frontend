"use client";
import Navbar from "@/components/commons/Navbar";
import Sidebar from "@/components/commons/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { data:session } = useSession();
  const router = useRouter('/');
  if(!session) {
    router.push('/login');
  }
  return (
    <>
      <main>
        <div className="flex items-start h-screen">
          <div className="w-1/5 h-full">
            <Sidebar />
          </div>
          <div className="w-4/5 h-full px-12">
            <Navbar />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
