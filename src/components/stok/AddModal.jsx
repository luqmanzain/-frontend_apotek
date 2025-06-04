import { useState } from "react";
import ReactDOM from "react-dom";

const AddModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    namaBarang: "",
    stock: "",
    hargaBeli: "",
    hargaJual: "",
    expDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { namaBarang, stock, hargaBeli, hargaJual, expDate } = form;

    if (!namaBarang || !stock || !hargaBeli || !hargaJual || !expDate) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      const response = await onSave({
        ...form,
        stock: parseInt(stock),
        hargaBeli: parseInt(hargaBeli),
        hargaJual: parseInt(hargaJual),
        expDate,
      });

      // Jika response ada message gagal
      if (response?.message === "Gagal menambah produk.") {
        setError(`Produk dengan nama "${namaBarang}" sudah ada.`);
        return;
      }

      // Reset & close jika sukses
      setForm({ namaBarang: "", stock: "", hargaBeli: "", hargaJual: "", expDate: "" });
      setError("");
      onClose();
    } catch (err) {
      setError(`Nama barang "${namaBarang}" sudah ada di stok.`);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Tambah Barang</h2>

        <div className="space-y-4">
          <input
            name="namaBarang"
            value={form.namaBarang}
            onChange={handleChange}
            placeholder="Nama Barang"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stok"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            name="hargaBeli"
            value={form.hargaBeli}
            onChange={handleChange}
            placeholder="Harga Beli"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            name="hargaJual"
            value={form.hargaJual}
            onChange={handleChange}
            placeholder="Harga Jual"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            name="expDate"
            value={form.expDate}
            onChange={handleChange}
            placeholder="Tanggal Expired"
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {error && (
            <div className="text-red-600 font-medium bg-red-100 border border-red-300 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={() => {
              setError("");
              onClose();
            }}
            className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-md bg-blue-500 hover:bg-green-600 text-white font-semibold"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddModal;
