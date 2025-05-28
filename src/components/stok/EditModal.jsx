import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const EditModal = ({ isOpen, onClose, onSave, stock }) => {
  const [form, setForm] = useState({
    id: "",
    namaBarang: "",
    stock: "",
    hargaBeli: "",
    hargaJual: "",
  });

  useEffect(() => {
    if (stock) {
      setForm(stock);
    }
  }, [stock]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cegah pengurangan stok
    if (name === "stock") {
      const newValue = parseInt(value);
      const oldValue = parseInt(stock.stock);
      if (newValue < oldValue) return; // Tidak boleh kurang dari stok lama
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.namaBarang || !form.stock || !form.hargaBeli || !form.hargaJual) {
      alert("Semua field harus diisi!");
      return;
    }

    onSave({
      ...form,
      stock: parseInt(form.stock),
      hargaBeli: parseInt(form.hargaBeli),
      hargaJual: parseInt(form.hargaJual),
    });
    onClose();
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

        <h2 className="text-2xl font-bold mb-6 text-center">Edit Barang</h2>

        <div className="space-y-4">
          {["namaBarang", "stock", "hargaBeli", "hargaJual"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={
                field === "namaBarang"
                  ? "Nama Barang"
                  : field === "stock"
                  ? "Stok"
                  : field === "hargaBeli"
                  ? "Harga Beli"
                  : "Harga Jual"
              }
              type={field === "namaBarang" ? "text" : "number"}
              min={field === "stock" ? stock?.stock || 0 : 0}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Update
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditModal;
