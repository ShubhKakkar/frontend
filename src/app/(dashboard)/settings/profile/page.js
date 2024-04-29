"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useSession } from "next-auth/react";
import PasswordModel from "@/components/ui/PasswordModel";
import { toast } from "react-toastify";

const Setting = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [userDetails, setUserDetails] = useState({
    id: session?.user?.id,
    mobile_number: session?.user?.mobile_number,
    email: session?.user?.email,
    location: session?.user?.location,
    first_name: session?.user?.first_name,
    last_name: session?.user?.last_name,
    role: session?.user?.role,
    profile: session?.user?.profile,
    location: session?.user?.location
  });
  const [settings, setSettings] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const isChanged =
      userDetails.mobile_number !== session?.user?.mobile_number ||
      userDetails.email !== session?.user?.email ||
      userDetails.location !== session?.user?.location;
    setHasChanges(isChanged);
  }, [userDetails, session]);

  const handleClosePasswordModal = () => {
    setSettings(false);
  };

  const handleSettingsModal = () => {
    setSettings((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!hasChanges) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/updateUser`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User details updated successfully");
    } catch (error) {
      console.error("Error occurred during user details update:", error);
    }
  };

  return (
    <div>
      <p className="text-lg mt-8 font-medium">Profile</p>
      <hr className="divider" />
      <div>
        {/* Profile */}
        <div>
          <div className="flex gap-6 items-center">
            <Image
              src={session?.user?.profile || ""}
              alt=""
              width={80}
              height={80}
              className="rounded-full bg-pink"
            />

            <h2 className="text-lg flex items-center font-medium">
              {session?.user?.first_name} {session?.user?.last_name}
              <span className="bg-gray-1 px-3 py-1 rounded-[4px] inline-block ml-3 text-xs bg-gray-200">
                {session?.user?.role}
              </span>
            </h2>
          </div>
          <button className="dark-blue w-[80px] text-center text-regular whitespace-nowrap mt-2 text-xs text-bluetint">
            Change Photo
          </button>
          <hr className="divider" />
          <div className="text-sm flex items-start gap-[250px]">
            {/* Account Details */}
            <div className="w-1/3">
              <h2 className="text-lg text-dark-blue font-medium">
                Account Details
              </h2>
              <div className="flex flex-col gap-8 my-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-blue-2">User ID</p>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-[250px] outline-none font-medium"
                      value={userDetails?.id}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-blue-2 flex items-center gap-2">
                      Phone
                      <Icon
                        icon="iconamoon:edit"
                        className="text-bluetint cursor-pointer"
                      />
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-[250px] outline-none font-medium"
                      value={userDetails?.mobile_number}
                      onChange={(e) => {
                        setUserDetails((prev) => ({
                          ...prev,
                          mobile_number: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-blue-2 flex items-center gap-2">
                      Email
                      <Icon
                        icon="iconamoon:edit"
                        className="text-bluetint cursor-pointer"
                      />
                    </p>
                  </div>
                  <div>
                    <input
                      type="email"
                      className="w-[250px] outline-none font-medium"
                      value={userDetails?.email}
                      onChange={(e) => {
                        setUserDetails((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-blue-2 flex items-center gap-2">
                      Location
                      <Icon
                        icon="iconamoon:edit"
                        className="text-bluetint cursor-pointer"
                      />
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-[250px] outline-none font-medium"
                      value={userDetails?.location}
                      onChange={(e) => {
                        setUserDetails((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className={`text-bluetint ${
                      hasChanges ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={handleSubmit}
                    disabled={!hasChanges}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <h2 className="text-lg text-dark-blue font-medium">
                Password & Security
              </h2>
              <h6
                className="text-bluetint text-xs mt-5 cursor-pointer"
                onClick={handleSettingsModal}
              >
                Change Password
              </h6>
              {settings && (
                <PasswordModel
                  handleClosePasswordModal={handleClosePasswordModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
