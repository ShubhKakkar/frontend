import React from "react";

const AnalyticsCard = ({ bgColor, children, title, count }) => {
  return (
    <div
      className={`${bgColor} py-4 px-3 rounded-xl h-16 flex items-center justify-between text-white`}
    >
      <div className="flex items-center gap-3 text-sm">
        {children}
        <h6 className="max-w-[150px]">{title}</h6>
      </div>
      <h2 className="text-3xl">{count}</h2>
    </div>
  );
};

export default AnalyticsCard;
