import Image from "next/image";
import React from "react";
import { CiCamera } from "react-icons/ci";

const UserOperationsCard = () => {
  return (
    <div className="w-[300px] min-h-[150px] rounded-lg border border-line shadow-lg flex items-start">
      <Image
        src="https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg"
        alt="user"
        className="h-full w-[96px] object-cover rounded-l-lg"
        height={150}
        width={96}
      />
      <div className="p-3 flex-1">
        <h2 className="text-lg font-medium">John Snow</h2>
        <div className="flex items-center gap-1 mt-2 mb-1">
          <p className="text-sm text-low">Manager</p>
          <p className="text-[10px] font-light text-low">
            | Added on 12 Jan 2023
          </p>
        </div>
        <p className="text-xs font-medium text-low">jon@xyz.com</p>
        <h2 className="font-medium text-low mt-5">Store Name</h2>
        <div className="flex items-center gap-1">
            <CiCamera />
            <h3 className="text-xs text-low">No. of Stores Assigned</h3>
            <h3 className="text-xs font-medium text-magenta">20</h3>
        </div>
      </div>
    </div>
  );
};

export default UserOperationsCard;
