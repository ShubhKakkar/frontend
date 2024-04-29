"use client";
import React from "react";
import Image from "next/image";
import { GoGear } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useDetectClickOutside } from "react-detect-click-outside";

const ProfileCard = ({ handleCloseSettings }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const redirectToSettings = () => {
    router.push("/settings/profile");
  };
  const ref = useDetectClickOutside({ onTriggered: handleCloseSettings });
  return (
    <div className="absolute right-0 top-16 min-h-40 w-[300px] rounded-xl bg-gray-200 px-4 py-6 flex flex-col gap-2 items-center" ref={ref}>
      <Image
        src={session?.user?.profile}
        className="rounded-full overflow-hidden"
        width={36}
        height={36}
        alt=""
      />
      <div className="text-center">
        <h2 className="text-lg font-medium">
          Hi, {session?.user?.first_name + " " + session?.user?.last_name}
        </h2>
        <p>{session?.user?.email}</p>
      </div>
      <div className="flex items-center justify-around w-full mt-4">
        <div
          className="flex items-center gap-1 cursor-pointer group"
          onClick={redirectToSettings}
        >
          <GoGear />
          <h2 className="text-sm text-gray-400 group-hover:text-gray-600 ease-in duration-200">
            Manage Account
          </h2>
        </div>
        <div className="flex items-center gap-1 group cursor-pointer" onClick={signOut}>
          <RiLogoutBoxLine />
          <h2 className="text-sm text-gray-400 group-hover:text-gray-600 ease-in duration-200">
            Sign Out
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
