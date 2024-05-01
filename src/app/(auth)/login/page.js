"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="h-screen flex items-center">
      <div className="w-2/3 h-full grid place-items-center text-lg bg-gradient-to-b from-[#90e646] via-primary to-[#0dc7c0]">
        <em>
          <q>Quote goes here</q>
        </em>
      </div>
      <div className="w-1/3 h-full bg-[#03013a] grid place-items-center p-24">
        <div className="w-full flex flex-col gap-4">
          <Image
            src="/logo.png"
            alt="logo"
            height={200}
            width={200}
            className="object-contain h-[200px] w-full mb-8"
            unoptimized
          />
          <div className="flex flex-col gap-2">
            <label className="text-white">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="bg-gradient-to-b from-[#90e646] via-primary to-[#0dc7c0] text-white w-[100px] px-4 py-2 rounded-lg font-medium mx-auto mt-4"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
