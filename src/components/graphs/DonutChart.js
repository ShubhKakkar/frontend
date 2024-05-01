import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({
  size,
  color,
  series,
}) => {
  const HEIGHT = size || 90;
  return (
    <ReactApexChart
      options={{
        chart: {
          type: "donut",
          width: HEIGHT,
          height: HEIGHT,
          toolbar: { show: false },
        },
        dataLabels: {
          enabled: false,
        },
        states: {
          hover: { filter: { value: 1, type: "darken" } },
          active: { filter: { value: 1, type: "darken" } },
        },
        colors: ["#EBE60B", color || "#FF007A"],
        stroke: { show: false },
        plotOptions: {
          pie: {
            customScale: 1,
            expandOnClick: false,
            donut: { size: "70%" },
          },
        },
        tooltip: { enabled: false },
        legend: { show: false },
      }}
      series={series}
      type="donut"
      width={HEIGHT}
      height={HEIGHT}
    />
  );
};

export default React.memo(DonutChart);
