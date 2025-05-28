import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaWallet } from "react-icons/fa";
import Sidebar from "../../components/layout/sidebar";
import DashboardCard from "../../components/dashboard/DashboardCard";
import api from "../../api/api";

const Dashboard = () => {
  const [laporan, setLaporan] = useState([]);
  const [tanggalDipilih, setTanggalDipilih] = useState("");

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    try {
      const response = await api.get("/transaksi");
      setLaporan(response.data);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
    }
  };

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
    const saldo = pemasukan - pengeluaran;

    return { pemasukan, pengeluaran, saldo };
  };

  const { pemasukan, pengeluaran, saldo } = getSummary();

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
    // {
    //   label: "Saldo",
    //   value: saldo,
    //   color: "#4ade80",
    //   icon: <FaWallet />,
    // },
  ];

  return (
    <Sidebar titlePage="Dashboard">
      <div className="px-6 py-8 max-w-screen-xl mx-auto bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>

        {/* Date Filter (Single) */}
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            className="p-2 border rounded"
            value={tanggalDipilih}
            onChange={(e) => setTanggalDipilih(e.target.value)}
          />
        </div>

        {/* Summary Cards */}
        <div className="flex flex-wrap gap-6">
          {cardData.map((item, idx) => (
            <DashboardCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
