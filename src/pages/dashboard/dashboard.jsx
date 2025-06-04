import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Sidebar from "../../components/layout/sidebar";
import DashboardCard from "../../components/dashboard/DashboardCard";
import IncomeExpenseChart from "../../components/dashboard/IncomeExpenseChart";
import ProductPieChart from "../../components/dashboard/ProductPieChart";
import StockWarning from "../../components/dashboard/StockWarning";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { laporan, stocks } = useAppContext();
  const [tanggalDipilih, setTanggalDipilih] = useState("");

  const filterLaporanByTanggal = (data) => {
    if (!tanggalDipilih) return data;
    return data.filter((item) => item.tanggal === tanggalDipilih);
  };

  const getSummary = () => {
    const filtered = filterLaporanByTanggal(laporan);
    const pemasukan = filtered
      .filter((item) => item.jenis === "Pemasukan")
      .reduce((acc, item) => acc + item.total, 0);
    const pengeluaran = filtered
      .filter((item) => item.jenis === "Pengeluaran")
      .reduce((acc, item) => acc + item.total, 0);
    return { pemasukan, pengeluaran };
  };

  const { pemasukan, pengeluaran } = getSummary();

  const cardData = [
    {
      label: "Total Pemasukan",
      value: pemasukan,
      color: "#38BDF8",
      icon: <FaArrowRight />,
    },
    {
      label: "Total Pengeluaran",
      value: pengeluaran,
      color: "#FACC15",
      icon: <FaArrowLeft />,
    },
  ];

  const chartLineData = Object.values(
    laporan.reduce((acc, curr) => {
      const key = curr.tanggal;
      if (!acc[key]) {
        acc[key] = { tanggal: curr.tanggal, Pemasukan: 0, Pengeluaran: 0 };
      }
      acc[key][curr.jenis] += curr.total;
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  const pieData = stocks.map((item) => ({
    name: item.namaBarang,
    value: item.stock,
  }));

  return (
    <Sidebar titlePage="Dashboard">
      <div className="px-4 py-6 md:px-6 md:py-8 max-w-screen-xl mx-auto bg-gray-50 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>

        {/* Filter Tanggal */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <label className="text-sm md:text-base text-gray-700 font-medium">Pilih Tanggal:</label>
          <input
            type="date"
            className="p-2 border rounded-md shadow-sm text-sm md:text-base"
            value={tanggalDipilih}
            onChange={(e) => setTanggalDipilih(e.target.value)}
          />
        </div>

        {/* Summary Cards + Stock Warning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {cardData.map((item, idx) => (
            <DashboardCard key={idx} {...item} />
          ))}
          <StockWarning threshold={5} asCard />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Grafik Pemasukan & Pengeluaran</h2>
            <IncomeExpenseChart data={chartLineData} />
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Stok Produk</h2>
            <ProductPieChart data={pieData} />
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
