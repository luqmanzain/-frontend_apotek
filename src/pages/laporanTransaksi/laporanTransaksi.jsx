import React, { useState, useRef } from "react";
import Sidebar from "../../components/layout/sidebar";
import { useAppContext } from "../../context/AppContext";
import { FaEye } from "react-icons/fa";
import DetailModal from "../../components/shared/DetailModal";

const LaporanTransaksi = () => {
  const { laporan } = useAppContext();
  const [tanggalDari, setTanggalDari] = useState("");
  const [tanggalSampai, setTanggalSampai] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null);
  const tableRef = useRef();

  const filteredLaporan = laporan.filter((item) => {
    if (!tanggalDari || !tanggalSampai) return true;
    return item.tanggal >= tanggalDari && item.tanggal <= tanggalSampai;
  });

  const pemasukan = filteredLaporan.filter((item) => item.jenis === "Pemasukan");
  const pengeluaran = filteredLaporan.filter((item) => item.jenis === "Pengeluaran");

  const total = (data) => data.reduce((sum, item) => sum + item.total, 0);

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const TableSection = ({ title, data, color }) => {
    const isPemasukan = color === "blue";
    const bgColor = isPemasukan ? "bg-blue-50" : "bg-red-50";
    const textColor = isPemasukan ? "text-blue-600" : "text-red-600";

    return (
      <div className="mt-8">
        <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>{title}</h2>
        <div className="overflow-x-auto">
          <table className={`min-w-full border border-gray-200 bg-white shadow-md rounded-lg ${bgColor}`}>
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                <>
                  {data.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{item.tanggal}</td>
                      <td className={`py-3 px-4 text-sm font-medium ${textColor}`}>
                        Rp {item.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <button
                          onClick={() => setSelectedDetail(item)}
                          className={`hover:underline ${textColor} print:hidden`}
                          title="Lihat detail"
                        >
                          <FaEye />
                        </button>
                        <div className="hidden print:block text-xs text-gray-600 mt-1">
                          {item.detail?.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {item.detail.map((b, idx) => (
                                <li key={idx}>
                                  {b.nama} - {b.jumlah} x Rp {b.harga.toLocaleString()}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span>-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-700">Total</td>
                    <td className={`py-3 px-4 text-sm ${textColor}`}>
                      Rp {total(data).toLocaleString()}
                    </td>
                    <td></td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-500">
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <Sidebar titlePage="Laporan Transaksi">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow space-y-6 mt-6">
        <h1 className="text-2xl font-semibold">Laporan Transaksi</h1>

        <div className="grid md:grid-cols-2 gap-4 no-print">
          <input
            type="date"
            className="border p-2 rounded"
            value={tanggalDari}
            onChange={(e) => setTanggalDari(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={tanggalSampai}
            onChange={(e) => setTanggalSampai(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 mt-4 no-print">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Print Laporan
          </button>
        </div>

        <div ref={tableRef}>
          <TableSection title="Pemasukan" data={pemasukan} color="blue" />
          <TableSection title="Pengeluaran" data={pengeluaran} color="red" />
        </div>

        <DetailModal
          selectedDetail={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      </div>
    </Sidebar>
  );
};

export default LaporanTransaksi;
