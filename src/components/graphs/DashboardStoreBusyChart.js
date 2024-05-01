"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { useSession } from "next-auth/react";

const DashboardStoreBusyChart = () => {
  const [chartData, setChartData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = session?.user?.token;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/store/storeEmployee/getSafetyDetailsOfAllEmployeesByStore/1/1/5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          console.log(response?.data);
          setChartData(response?.data);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    if (session) {
      fetchChartData();
    }
  }, [session]);

  return (
    <>
      <svg className="h-0 overflow-hidden">
        <linearGradient
          id="dashboard_grad_store"
          x1="0"
          y1="0.5"
          x2="1"
          y2="0.5"
        >
          <stop offset="0%" stopColor="#ebe60b" />
          <stop offset="25%" stopColor="#c0e90a" />
          <stop offset="50%" stopColor="#7eed08" />
          <stop offset="100%" stopColor="#07e1a4" />
        </linearGradient>
      </svg>
      <ReactApexChart
        options={{
          // options here
        }}
        series={[
          {
            data: chartData || [],
          },
        ]}
        type="area"
        height={350}
      />
    </>
  );
};

export default React.memo(DashboardStoreBusyChart);
