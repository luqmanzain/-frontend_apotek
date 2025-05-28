import React, { useState, useRef } from "react";
import Sidebar from "../../components/layout/sidebar";
import { useAppContext } from "../../context/AppContext";

const LaporanTransaksi = () => {
  const { laporan } = useAppContext();
  const [tanggalDari, setTanggalDari] = useState("");
  const [tanggalSampai, setTanggalSampai] = useState("");
  const tableRef = useRef();

  const filteredLaporan = laporan.filter((item) => {
    if (!tanggalDari || !tanggalSampai) return true;
    return item.tanggal >= tanggalDari && item.tanggal <= tanggalSampai;
  });

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore React state
  };

  return (
    <Sidebar titlePage="Laporan Transaksi">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow space-y-6 mt-6">
        <h1 className="text-2xl font-semibold">Laporan Transaksi</h1>

        {/* Filter & Tombol - tidak dicetak */}
        <div className="grid md:grid-cols-2 gap-4 no-print">
          <input
            type="date"
            className="border p-2"
            value={tanggalDari}
            onChange={(e) => setTanggalDari(e.target.value)}
          />
          <input
            type="date"
            className="border p-2"
            value={tanggalSampai}
            onChange={(e) => setTanggalSampai(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 mt-4 no-print">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Print Tabel
          </button>
        </div>

        {/* Tabel yang akan dicetak */}
        <div ref={tableRef}>
          <table className="w-full text-sm border mt-6">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Jenis</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {filteredLaporan.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{item.tanggal}</td>
                  <td
                    className={`px-4 py-2 border ${
                      item.jenis === "Pemasukan"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.jenis}
                  </td>
                  <td className="px-4 py-2 border">
                    Rp {item.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
};

export default LaporanTransaksi;
