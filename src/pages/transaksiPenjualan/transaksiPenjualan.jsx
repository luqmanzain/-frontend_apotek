import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/layout/sidebar";
import InputField from "../../components/transaksi-penjualan/InputField";
import Button from "../../components/transaksi-penjualan/Button";
import TableKeranjang from "../../components/transaksi-penjualan/TableKeranjang";
import { useAppContext } from "../../context/AppContext";

const TransaksiPenjualan = () => {
  const { stocks, sellProduct } = useAppContext();
  const [produkId, setProdukId] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [keranjang, setKeranjang] = useState([]);
  const [tanggalTransaksi, setTanggalTransaksi] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProduk, setFilteredProduk] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    setTanggalTransaksi(dateStr);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProduk([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(() => {
      const filtered = stocks.filter((item) =>
        item.namaBarang.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProduk(filtered);
      setShowDropdown(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchTerm, stocks]);

  const handleTambahProduk = () => {
    const produk = stocks.find((item) => item.id === parseInt(produkId));
    if (!produk) {
      alert("Produk tidak ditemukan!");
      return;
    }
    if (jumlah > produk.stock) {
      alert("Stok tidak mencukupi!");
      return;
    }

    const newItem = {
      id: produk.id,
      namaBarang: produk.namaBarang,
      hargaJual: produk.hargaJual,
      jumlah: jumlah,
    };

    setKeranjang((prev) => [...prev, newItem]);
    setProdukId("");
    setJumlah(1);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleHapus = (index) => {
    setKeranjang((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSimpanTransaksi = () => {
    if (keranjang.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    sellProduct(keranjang, null, tanggalTransaksi);

    alert("Transaksi berhasil disimpan!");

    setKeranjang([]);
    setProdukId("");
    setJumlah(1);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const totalHarga = keranjang.reduce(
    (total, item) => total + item.hargaJual * item.jumlah,
    0
  );

  return (
    <Sidebar titlePage="Transaksi Penjualan">
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Transaksi Penjualan
          </h1>

          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Tanggal" value={tanggalTransaksi} readOnly />
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Cari Produk
              </label>
              <input
                ref={searchRef}
                type="text"
                placeholder="Ketik nama produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {filteredProduk.length > 0 && (
                <ul
                  className={`absolute z-20 bg-white border border-gray-300 rounded-lg w-full max-h-40 overflow-y-auto mt-1 shadow-md text-sm transition-opacity duration-300 ease-in-out ${
                    showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {filteredProduk.map((item) => (
                    <li
                      key={item.id}
                      onMouseDown={() => {
                        setProdukId(item.id);
                        setSearchTerm(item.namaBarang);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {item.namaBarang} (Stok: {item.stock})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <InputField
              label="Jumlah"
              type="number"
              value={jumlah}
              min="1"
              onChange={(e) =>
                setJumlah(Math.max(1, parseInt(e.target.value) || 1))
              }
            />

            <div className="flex justify-end">
              <Button
                onClick={handleTambahProduk}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
              >
                Tambah ke Keranjang
              </Button>
            </div>
          </div>

          <TableKeranjang keranjang={keranjang} handleHapus={handleHapus} />

          <div className="flex justify-end mt-6">
            <div className="text-lg font-bold text-gray-700">
              Total:{" "}
              <span className="text-blue-600">
                Rp {totalHarga.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSimpanTransaksi}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              Simpan Transaksi
            </Button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default TransaksiPenjualan;
