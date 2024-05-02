"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { MdInsertChartOutlined, MdStorefront } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegQuestionCircle } from "react-icons/fa";

const Sidebar = () => {
  const [analytics, setAnalytics] = useState(true);
  const path = usePathname();
  return (
    <div className="sidebg h-full py-6 px-12 text-white">
      <Image
        src={"/logo.png"}
        width={110}
        height={200}
        alt="Logo"
        className="object-contain object-center"
      />
      <div className="my-20 flex flex-col gap-6 items-start">
        {/* Analytics */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => {
              setAnalytics((prev) => !prev);
            }}
          >
            <div className="flex items-center gap-2 text-lg">
              <MdInsertChartOutlined className="icon" />
              <h6>Analytics</h6>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="icon" />
            </div>
          </div>
          {analytics && (
            <div className="ml-4 flex flex-col gap-7 my-7 text-sm">
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer ${
                  path === "/" && "text-highlighted"
                }`}
              >
                <IoGridOutline />
                <Link href="/">Dashboard</Link>
              </div>
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer ${
                  path === "/analytics/stores" && "text-highlighted"
                }`}
              >
                <MdStorefront />
                <Link href="/analytics/stores">Stores</Link>
              </div>
            </div>
          )}
        </div>
        {/* Support */}
        <div
          className={`flex items-center gap-2 ease-in dration-200 cursor-pointer text-lg ${
            path === "/support" && "text-highlighted"
          }`}
        >
          <FaRegQuestionCircle />
          <Link href="/support">Support</Link>
        </div>
      </div>
      {/* Log Out */}
      <div className="mt-20 absolute bottom-8">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={signOut}
        >
          <RiLogoutBoxLine className="icon" />
          <h6>Log Out</h6>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
