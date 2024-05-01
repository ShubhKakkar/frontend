import React from "react";
import moment from "moment";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

const StoresCard = ({ store, role = "user" }) => {
  return (
    <div className="relative w-full flex w-fill h-[200px] bg-white rounded-2xl overflow-hidden shadow-1 shadow-lg border-2">
      {role === "superadmin" && (
        <BsThreeDotsVertical className="absolute top-2 right-2 cursor-pointer icon" />
      )}
      <div className="w-[70px] relative">
        <Image
          src={
            "https://th.bing.com/th/id/OIP.avb9nDfw3kq7NOoP0grM4wHaEK?rs=1&pid=ImgDetMain"
          }
          alt=""
          fill
          className="object-cover h-[176px] w-[79px]"
        />
      </div>
      <div className="flex-1 flex-col px-3 py-8">
        <h3 className="text-xl font-semibold">{store?.name}</h3>
        <span className="text-sm font-light text-low text-dark-blue-4 block mb-1">
          {store?.address}, {store?.country}
        </span>
        <p className="font-medium mt-2">{store?.manager}</p>
        <p className="text-sm text-low">
          Manager
          <span className="inline-block text-dark-blue-4 mx-1">|</span>
          <span className="text-xs font-light inline-block text-dark-blue-4">
            Added on {moment(store?.createdAt).format("DD MMMM YYYY")}
          </span>
        </p>
        <p className="text-low flex items-center gap-1 mt-5 text-xs">
          No. of Cameras Assigned
          <span className="text-pink text-xs font-medium inline-block ml-2 text-magenta">
            {store?.cameraCount}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StoresCard;
