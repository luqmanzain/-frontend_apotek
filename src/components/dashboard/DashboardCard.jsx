import React from "react";

const DashboardCard = ({ label, value, color, icon }) => {
  return (
    <div
      className="flex items-center p-4 rounded-xl shadow-md bg-white w-full"
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <div
        className="text-3xl text-white p-3 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-900">
          Rp {value.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
