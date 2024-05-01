import React from "react";

const DateRange = ({ selectedRange, setSelectedRange }) => {
  return (
    <div className="flex items-center justify-end mb-4 mt-6">
      <div className="flex items-center gap-3">
        <p className="text-xs text-low">DATE RANGE</p>
        <button
          className={`${
            selectedRange === 7
              ? "bg-sky-500 ring-1 ring-sky-blue text-white"
              : "ring-1"
          } py-1 px-2 rounded text-xs text-low font-medium`}
          onClick={() => setSelectedRange(7)}
        >
          Last 7 Days
        </button>
        <button
          className={`${
            selectedRange === 15
              ? "bg-sky-500 ring-1 ring-sky-blue text-white"
              : "ring-1"
          } py-1 px-2 rounded text-xs text-low font-medium`}
          onClick={() => setSelectedRange(15)}
        >
          Last 15 Days
        </button>
        <button
          className={`${
            selectedRange === 30
              ? "bg-sky-500 ring-1 ring-sky-blue text-white"
              : "ring-1"
          } py-1 px-2 rounded text-xs text-low font-medium`}
          onClick={() => setSelectedRange(30)}
        >
          Last 30 Days
        </button>
        {/* <button
          className={`${
            selectedRange === 0
              ? "bg-sky-500 ring-1 ring-sky-blue text-white"
              : "ring-1"
          } py-1 px-2 rounded text-xs text-low font-medium`}
          onClick={() => setSelectedRange(0)}
        >
          Custom
        </button> */}
      </div>
    </div>
  );
};

export default DateRange;
