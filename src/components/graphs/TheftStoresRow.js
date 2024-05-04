import React from "react";
import DonutChart from "@/components/graphs/DonutChart";
import { MdStorefront } from "react-icons/md";

const TheftStoresRow = ({ store }) => {
  let preventedPer = Math.round(
    (store?.theft_prevented / store?.theft_detected) * 100
  );
  if (isNaN(preventedPer)) {
    preventedPer = 0;
  }
  const detectedPer = store?.theft_detected > 0 ? 100 : 0;
  const count = `${store?.theft_prevented} / ${store?.theft_detected}`;
  const series = [
    Math.round(detectedPer * 90),
    Math.round(preventedPer * 90)
  ];
  return (
    <div className="p-3 even:bg-[#F7F7F9] flex gap-3 rounded-xl border-line border-[1px]">
      <div className="w-1/3 flex items-start justify-between gap-2 flex-col">
        <div className="flex items-center gap-3">
          <MdStorefront className="icon" />
          <p className="flex items-center gap-2 text-xs">
            {store?.name}
          </p>
        </div>
        <div className="mt-auto w-full">
          <div className="flex items-center gap-2 flex-1">
            <span
              className="h-[10px] bg-gray-200 rounded-full text-xs"
              style={{ width: `${detectedPer}%` }}
            ></span>
            <span className="text-dark-blue-3 text-xs">{detectedPer}%</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <span
              className="h-3 bg-blue-500 rounded-full text-xs"
              style={{ width: `${preventedPer}%` }}
            ></span>
            <span className="text-xs">
              <span className="text-[#00A569] inline-block mr-1">
                {preventedPer}%
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-1/3 flex-col">
        <p className="py-1 px-2 text-dark-blue-4 bg-gray-200 rounded-full whitespace-nowrap text-[10px]">
          Cameras: <b>{store?.cameraCount}</b>
        </p>
        <p className="text-xs text-center text-dark-blue-4 mt-2">
          <b>Manager</b> <br />
          {store?.manager}
        </p>
      </div>

      <div className="flex justify-between w-1/3 flex-col items-center">
        <p className=" text-dark-blue-4 bg-gray-200 rounded-full text-[10px] py-1 px-2">
          Case Resolved
        </p>
        <div className="relative grid mt-2">
          <span className="text-[10px] font-semibold absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            {count ? count : "0/0"}
          </span>
          <DonutChart
            series={series || []}
          />
        </div>
      </div>
    </div>
  );
};

export default TheftStoresRow;
