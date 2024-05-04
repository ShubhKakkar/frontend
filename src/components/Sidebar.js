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
import { FiUsers } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { IoMapOutline } from "react-icons/io5";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdOutlineFeaturedVideo } from "react-icons/md";

const Sidebar = () => {
  const [analytics, setAnalytics] = useState(true);
  const [userManagment, setUserManagment] = useState(false);
  const [features, setFeatures] = useState(false);
  const path = usePathname();

  const toggleAnalytics = () => {
    setAnalytics(prev => !prev);
    setUserManagment(false);
    setFeatures(false);
  };

  const toggleUserManagement = () => {
    setUserManagment(prev => !prev);
    setAnalytics(false);
    setFeatures(false);
  };

  const toggleFeatures = () => {
    setFeatures(prev => !prev);
    setAnalytics(false);
    setUserManagment(false);
  };

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
            onClick={toggleAnalytics}
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
            <div className="ml-4 flex flex-col gap-7 mt-7 text-sm">
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer hover:text-white duration-200 ${
                  path === "/" ? "text-highlighted" : "text-disabled"
                }`}
              >
                <IoGridOutline />
                <Link href="/">Dashboard</Link>
              </div>
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer hover:text-white duration-200 ${
                  path === "/analytics/stores" ? "text-highlighted" : "text-disabled"
                }`}
              >
                <MdStorefront />
                <Link href="/analytics/stores">Stores</Link>
              </div>
            </div>
          )}
        </div>
        {/* Features */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleFeatures}
          >
            <div className="flex items-center gap-2 text-lg">
              <MdOutlineFeaturedVideo className="icon" />
              <h6>Features</h6>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="icon" />
            </div>
          </div>
          {features && (
            <div className="ml-4 flex flex-col gap-7 mt-7 text-sm">
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer hover:text-white duration-200 ${
                  path === "/features/theft-detection" ? "text-highlighted" : "text-disabled"
                }`}
              >
                <MdOutlineSecurity />
                <Link href="/features/theft-detection">Theft Detection</Link>
              </div>
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer hover:text-white duration-200 ${
                  path === "/features/employee-efficiency" ? "text-highlighted" : "text-disabled"
                }`}
              >
                <GoGraph />
                <Link href="/features/employee-efficiency">
                  Employee Efficiency Management{" "}
                </Link>
              </div>
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer hover:text-white duration-200 ${
                  path === "/features/people-counter" ? "text-highlighted" : "text-disabled"
                }`}
              >
                <FaRegUser />
                <Link href="/features/people-counter">People Counter</Link>
              </div>
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer hover:text-white duration-200 ${
                  path === "/features/heat-map" ? "text-highlighted" : "text-disabled"
                }`}
              >
                <IoMapOutline />
                <Link href="/features/heat-map">Heat Map</Link>
              </div>
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer hover:text-white duration-200 ${
                  path === "/features/safety-feature" ? "text-highlighted" : "text-disabled"
                }`}
              >
                <MdOutlineHealthAndSafety />
                <Link href="/features/safety-feature">Safety Feature</Link>
              </div>
            </div>
          )}
        </div>
        {/* User Management */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleUserManagement}
          >
            <div className="flex items-center gap-2 text-lg">
              <FiUsers className="icon" />
              <h6>User Managment</h6>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="icon" />
            </div>
          </div>
          {userManagment && (
            <div className="ml-4 flex flex-col gap-7 mt-7 text-sm">
              <div
                className={`flex items-center gap-2 ease-in dration-200 cursor-pointer hover:text-white duration-200 ${
                  path === "/user/operations" ? "text-highlighted" : "text-disabled"
                }`}
              >
                <IoGridOutline />
                <Link href="/user/operations">User Operations</Link>
              </div>
            </div>
          )}
        </div>
        {/* Support */}
        <div
          className={`flex items-center gap-2 ease-in dration-200 cursor-pointer text-lg ${
            path === "/support"
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