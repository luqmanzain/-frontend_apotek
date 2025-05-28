import React from "react";

const DashboardCard = ({ label, value, color, icon }) => {
  return (
    <div
      className="flex items-center p-5 rounded-xl shadow-lg bg-white"
      style={{ borderLeft: `6px solid ${color}` }} 
    >
      <div
        className="text-4xl text-white p-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="ml-5">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">
          Rp {value.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
