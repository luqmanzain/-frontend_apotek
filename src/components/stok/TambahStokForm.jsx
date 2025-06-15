import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import { useAppContext } from "../../context/AppContext";

const TambahStokPage = () => {
  const { stocks, updateStock } = useAppContext();
  const [selectedId, setSelectedId] = useState("");
  const [jumlahTambah, setJumlahTambah] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const produk = stocks.find((item) => String(item.id) === String(selectedId));
    if (!produk) {
      setMessage({ type: "error", text: "Produk tidak ditemukan." });
      setIsSubmitting(false);
      return;
    }

    const jumlah = parseInt(jumlahTambah, 10);
    if (isNaN(jumlah) || jumlah <= 0) {
      setMessage({ type: "error", text: "Jumlah stok harus lebih dari 0." });
      setIsSubmitting(false);
      return;
    }

    const updatedStock = {
      ...produk,
      stock: produk.stock + jumlah,
    };

    try {
      await updateStock(updatedStock);
      setMessage({ type: "success", text: `Stok untuk ${produk.namaBarang} berhasil ditambahkan sebanyak ${jumlah}.` });
      setJumlahTambah("");
      setSelectedId("");
    } catch (error) {
      setMessage({ type: "error", text: error?.message || "Gagal menambahkan stok." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sidebar titlePage="Tambah Stok">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-semibold">Tambah Stok Produk</h1>

        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pilih Produk
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              required
            >
              <option value="">-- Pilih Produk --</option>
              {stocks.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.namaBarang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Jumlah Stok Ditambahkan
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={jumlahTambah}
              onChange={(e) => setJumlahTambah(e.target.value)}
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </Sidebar>
  );
};

export default TambahStokPage;
