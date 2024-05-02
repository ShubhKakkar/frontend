"use client";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";

const Support = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const userId = session?.user?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogoutOfAllDevices = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/logoutFromAllDevices/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res && res?.status === 200) {
        console.log(res?.status, res?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.success("Logged out successfully out of all other devices.");
    }
  };
  const handleDeleteAccount = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      signOut();
    }
  };
  return (
    <div className="h-fill px-16 pt-8">
      <div className="shadow-lg center py-3 px-4 max-w-md mx-auto rounded-md focus-within:ring-primary focus-within:ring-1 w-fill flex items-center gap-2 text-low border-[2px]">
        <input
          type="text"
          placeholder="Have a Question? Ask or enter a search term here..."
          className="flex-1 w-full outline-none"
        />
        <FaSearch className="icon" />
      </div>
      <div className="flex items-center justify-between py-12">
        <div className="center w-full flex items-center gap-2 justify-center">
          <div className="bg-yellow-300 p-2 rounded-full">
            <IoPhonePortraitSharp className="icon" />
          </div>
          <p className="text-dark-blue text-lg font-semibold">
            +1 313-749-8832
          </p>
        </div>
        <div className="center w-full flex items-center gap-2 justify-center">
          <div className="bg-blue-300 p-2 rounded-full">
            <MdOutlineMail className="icon" />
          </div>
          <p className="text-dark-blue text-lg font-semibold">info@moksa.ai</p>
        </div>
        <div className="center w-full flex items-center gap-2 justify-center">
          <div className="bg-green-300 p-2 rounded-full">
            <MdOutlineChat className="icon" />
          </div>
          <p className="text-dark-blue text-lg font-semibold">Chat Support</p>
        </div>
      </div>
      <div className="flex items-start gap-16">
        <div className="flex-1">
          <hr className="divider" />
          <p className="text-lg text-dark-blue">For any complaints</p>
          <p className="text-md mt-4 text-sm font-light">
            Raise a ticket and we&apos;ll reply as soon as we can, or come back
            later. Our live support is open 8am-7pm CST,Monday-Saturday.
          </p>
          <div className="flex items-center mt-6 gap-8">
            <button className="hover:underline text-bluetint text-sm">
              Raise a ticket
            </button>
            <button className="hover:underline text-sm">My Tickets</button>
          </div>
        </div>
        <div className="flex-1">
          <hr className="divider" />
          <div className="flex items-center gap-3">
            <p>Request additional feature</p>
            <button className="px-4 py-2 dark-blue hover:bg-gray-200 rounded-full text-bluetint text-sm">
              Click Here
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-44 pb-8">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-dark-blue">Log out all devices</p>
            <p className="text-md text-dark-blue-2 font-light mt-1 text-xs">
              Log out all other active sessions on other devices besides this
              one
            </p>
          </div>
          <div
            className="hover:bg-gray-200 p-2 rounded-full ease-in duration-200 cursor-pointer"
            onClick={handleLogoutOfAllDevices}
          >
            <FaChevronRight className="icon" />
          </div>
        </div>
        <button
          className="text-magenta text-xs mt-8"
          onClick={() => setIsModalOpen(true)}
        >
          Delete my Account
        </button>
      </div>
      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
};

export default Support;
