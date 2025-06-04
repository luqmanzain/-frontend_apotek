import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const IncomeExpenseChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tanggal" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="Pemasukan"
          stroke="#38BDF8"
          fill="#38BDF8"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="Pengeluaran"
          stroke="#FACC15"
          fill="#FACC15"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;