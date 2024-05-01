"use client";
import DashboardTheftChart from "@/components/graphs/DashboardTheftChart";
import Dropdown from "@/components/Dropdown";
import React, { useState } from "react";

const TheftsDetected = () => {
  const [storeId, setStoreId] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-12">
        <h1 className="font-medium">Thefts Detected</h1>
        <Dropdown
          options={["All Stores"]}
          className="bg-transparent"
          setStoreId={setStoreId}
        />
      </div>
      <div className="my-6">
        <DashboardTheftChart storeId={storeId} />
      </div>
    </div>
  );
};

export default TheftsDetected;
