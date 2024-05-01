"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

const DashboardTableChart = () => {
  const HEIGHT = 70;
  const WIDTH = 80;
  return (
    <ReactApexChart
      options={{
        chart: {
          type: "line",
          height: HEIGHT + 40,
          width: WIDTH + 40,
          zoom: { enabled: false },
          toolbar: { show: false },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: "smooth",
        },
        colors: ["#02A7FD"],
        grid: { show: false },
        xaxis: {
          axisTicks: { show: false },
          labels: { show: false },
          axisBorder: { show: false },
        },

        yaxis: {
          labels: { show: false },
        },
        tooltip: { enabled: false },
      }}
      series={[{ data: [1, 10, 5, 8] }]}
      type="line"
      height={HEIGHT}
      width={WIDTH}
    />
  );
};

export default DashboardTableChart;
