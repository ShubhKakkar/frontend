"use client";
import React, { useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfileCard from "../ui/ProfileCard";

const Navbar = () => {
  const { data: session } = useSession();
  const [settings, setSettings] = useState(false);
  const handleSettings = () => {
    setSettings((prev) => !prev);
  };
  const handleCloseSettings = () => {
    setSettings(false);
  }
  return (
    <div className="h-[75px] flex items-center justify-between text-sm relative">
      <div className="flex items-center gap-2 font-medium text-base">
        <IoGridOutline className="icon" />
        <h6>Dashboard</h6>
      </div>
      <div>
        {session && (
          <div className="flex items-center gap-6">
            <FaRegBell className="icon" />
            <div
              className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-xl cursor-pointer duration-200"
              onClick={handleSettings}
            >
              <Image
                src={session?.user?.profile}
                className="rounded-full overflow-hidden"
                width={36}
                height={36}
                alt=""
              />
              <div className="text-dark-blue">
                <p className="font-semibold ">
                  {session?.user?.first_name + " " + session?.user?.last_name}
                </p>
                <p className="text-regular -mt-1">{session?.user?.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Settings Modal */}
      {settings && <ProfileCard handleCloseSettings={handleCloseSettings} />}
    </div>
  );
};

export default Navbar;
