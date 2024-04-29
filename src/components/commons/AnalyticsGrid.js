"use client";
import React, { useEffect, useState } from "react";
import AnalyticsCard from "../ui/AnalyticsCard";
import { MdStorefront } from "react-icons/md";
import { GoDeviceCameraVideo } from "react-icons/go";
import axios from "axios";
import { useSession } from "next-auth/react";

const AnalyticsGrid = () => {
  const [stores, setStores] = useState([]);
  const { data: session } = useSession();
  const fetchAllStores = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/getallstores1/${process.env.NEXT_PUBLIC_MIN_PAGE_LIMIT}/${process.env.NEXT_PUBLIC_MAX_PAGE_LIMIT}/2024-04-17`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      if (res) {
        console.log(res?.data);
        setStores(res?.data?.newStoreDetails);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (session) {
      fetchAllStores();
    }
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <AnalyticsCard
          bgColor="cardstores"
          title="No. of stores assigned"
          count={12}
        >
          <MdStorefront className="iconlg text-white bg-[#0D2846] p-1 rounded-xl" />
        </AnalyticsCard>
        <AnalyticsCard
          bgColor="cardcameras"
          title="No. of cameras assigned"
          count={12}
        >
          <GoDeviceCameraVideo className="iconlg text-white bg-[#0D2846] p-1 rounded-xl" />
        </AnalyticsCard>
        <AnalyticsCard
          bgColor="cardtheft"
          title="Total theft detected"
          count={12}
        >
          <MdStorefront className="iconlg text-white bg-[#0D2846] p-1 rounded-xl" />
        </AnalyticsCard>
        <AnalyticsCard
          bgColor="theftsprevented"
          title="No. of thefts prevented"
          count={12}
        >
          <MdStorefront className="iconlg text-white bg-[#0D2846] p-1 rounded-xl" />
        </AnalyticsCard>
      </div>
    </div>
  );
};

export default AnalyticsGrid;
