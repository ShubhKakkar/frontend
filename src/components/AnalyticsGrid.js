"use client";
import React, { useEffect, useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import { MdStorefront } from "react-icons/md";
import { GoDeviceCameraVideo } from "react-icons/go";
import { LuBadgeAlert } from "react-icons/lu";
import { MdHealthAndSafety } from "react-icons/md";
import axios from "axios";
import getDateBefore from "@/utils";
import { signOut, useSession } from "next-auth/react";

const AnalyticsGrid = ({ selectedRange }) => {
  const { data: session } = useSession();
  const [totals, setTotals] = useState({
    totalStores: 0,
    totalCameras: 0,
    totalTheftsDetected: 0,
    totalTheftsPrevented: 0,
  });
  const date = getDateBefore(selectedRange);
  const token = session?.user?.token;

  const getAnalyticsData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/getAllStoresTotalsByUserId/${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res && res.data) {
      if (res.status === 401) {
        signOut();
      }
      const { newUserDetails } = res.data;
      setTotals({
        totalStores: newUserDetails.totalStoreCount || 0,
        totalCameras: newUserDetails.totalCameraCount || 0,
        totalTheftsDetected: newUserDetails.totalDetectedThefts || 0,
        totalTheftsPrevented: newUserDetails.totalPreventedThefts || 0,
      });
    }
  };
  useEffect(() => {
    if (date && token) {
      getAnalyticsData();
    }
  }, [date]);
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <AnalyticsCard
          bgColor="cardstores"
          title="No. of stores assigned"
          count={totals.totalStores}
        >
          <MdStorefront className="iconlg text-white bg-[#0D2846] p-1 rounded-xl" />
        </AnalyticsCard>
        <AnalyticsCard
          bgColor="cardcameras"
          title="No. of cameras assigned"
          count={totals.totalCameras}
        >
          <GoDeviceCameraVideo className="iconlg text-white bg-[#0D2846] p-1 rounded-xl" />
        </AnalyticsCard>
        <AnalyticsCard
          bgColor="cardtheft"
          title="Total theft detected"
          count={totals.totalTheftsDetected}
        >
          <LuBadgeAlert className="iconlg text-white bg-[#0D2846] p-1 rounded-xl" />
        </AnalyticsCard>
        <AnalyticsCard
          bgColor="theftsprevented"
          title="No. of thefts prevented"
          count={totals.totalTheftsPrevented}
        >
          <MdHealthAndSafety className="iconlg text-white bg-[#0D2846] p-1 rounded-xl" />
        </AnalyticsCard>
      </div>
    </div>
  );
};

export default AnalyticsGrid;
