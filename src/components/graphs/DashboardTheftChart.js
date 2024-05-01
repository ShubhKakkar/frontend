"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DashboardTheftChart = ({ storeId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URI
          }/theft/theftDetectionDetailsByStoreid/${storeId || 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response && response.status === 401) {
          signOut();
        }
        if (response && response.data && response.status === 201) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred while fetching data.");
      }
    };

    if (session && token) {
      fetchData();
    }
  }, [storeId, session, token]);

  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      const chart = chartRef.current?.chart;

      const series = [
        {
          name: "Detected",
          data: new Array(12).fill(0),
        },
        {
          name: "Prevented",
          data: new Array(12).fill(0),
        },
      ];

      const categories = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      data.theftDetails.forEach((item) => {
        const monthIndex = categories.indexOf(item.month_name.trim());
        if (monthIndex !== -1) {
          series[0].data[monthIndex] = parseInt(item.theft_detected);
          series[1].data[monthIndex] = parseInt(item.theft_prevented);
        }
      });

      chart.updateOptions({
        xaxis: {
          categories: categories,
        },
      });

      chart.updateSeries(series);
    }
  }, [data]);

  return (
    <div>
      {data && (
        <ReactApexChart
          ref={chartRef}
          options={{
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ],
            },
            yaxis: {
              title: {
                text: "Counts",
              },
            },
            fill: {
              opacity: 1,
            },
          }}
          series={[
            {
              name: "Detected",
              data: new Array(12).fill(0),
            },
            {
              name: "Prevented",
              data: new Array(12).fill(0),
            },
          ]}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default DashboardTheftChart;
