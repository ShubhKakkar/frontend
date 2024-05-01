"use client";
import React, { useState } from "react";
import AnalyticsGrid from "@/components/AnalyticsGrid";
import DateRange from "@/components/DateRange";
import TheftsDetected from "@/components/graphs/TheftsDetected";
import AllStores from "@/components/graphs/AllStores";
import DashboardStoreBusyChart from "@/components/graphs/DashboardStoreBusyChart";
import DashboardEmployeeEff from "@/components/graphs/DashboardEmployeeEff";
import DashboardEmployeeSafetyProtocol from "@/components/graphs/DashboardEmployeeSafetyProtocol";
import DashboardOverviewTable from "@/components/graphs/DashboardOverviewTable";

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState(7);
  return (
    <main className="py-6">
      <AnalyticsGrid selectedRange={selectedRange} />
      <DateRange
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      <div className="grid grid-cols-3 gap-x-6">
        {/* Thefts Detected */}
        <div className="col-span-2">
          <TheftsDetected />
        </div>
        <div className="col-span-1">
          {/* All Stpres */}
          <AllStores selectedRange={selectedRange} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 mb-4">
        <div className="col-span-1">
          {/* Store Busy Hours*/}
          <p className="font-medium">Store Busy Hours</p>
          <DashboardStoreBusyChart />
        </div>
        <div className="col-span-1">
          {/* Daashboard Overview Table */}
          <p className="font-medium">Overview Table</p>
          <DashboardOverviewTable selectedRange={selectedRange} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6">
        <div className="col-span-1">
          {/* Employee effciency */}
          <DashboardEmployeeEff />
        </div>
        <div className="col-span-1">
          {/* Safety Protocols */}
          <DashboardEmployeeSafetyProtocol />
        </div>
      </div>
    </main>
  );
}
