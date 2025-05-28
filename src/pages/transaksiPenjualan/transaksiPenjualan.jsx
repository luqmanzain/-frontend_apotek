import React, { useState, useEffect } from "react";
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
  const [nomorTransaksi, setNomorTransaksi] = useState("");
  const [tanggalTransaksi, setTanggalTransaksi] = useState("");

  useEffect(() => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.getHours().toString().padStart(2, "0") + now.getMinutes().toString().padStart(2, "0");
    setTanggalTransaksi(dateStr);
    setNomorTransaksi(`TRX-${dateStr.replace(/-/g, "")}-${timeStr}`);
  }, []);

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
  };

  const handleHapus = (index) => {
    setKeranjang((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSimpanTransaksi = () => {
    if (keranjang.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    sellProduct(keranjang, nomorTransaksi, tanggalTransaksi);
    alert("Transaksi berhasil disimpan!");

    setKeranjang([]);
    setProdukId("");
    setJumlah(1);
  };

  const totalHarga = keranjang.reduce(
    (total, item) => total + item.hargaJual * item.jumlah,
    0
  );

  return (
    <Sidebar titlePage="Transaksi Penjualan">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6 mt-6">
        <h1 className="text-2xl font-semibold">Transaksi Penjualan</h1>

        <div className="grid md:grid-cols-2 gap-4">
          <InputField label="Nomor Transaksi" value={nomorTransaksi} readOnly />
          <InputField label="Tanggal" value={tanggalTransaksi} readOnly />
        </div>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Produk</label>
            <select
              value={produkId}
              onChange={(e) => setProdukId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Pilih Produk --</option>
              {stocks.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.namaBarang} (Stok: {item.stock})
                </option>
              ))}
            </select>
          </div>
          <InputField
            label="Jumlah"
            type="number"
            value={jumlah}
            min="1"
            onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleTambahProduk} className="bg-blue-600 hover:bg-blue-700">
            Tambah ke Keranjang
          </Button>
        </div>

        <TableKeranjang keranjang={keranjang} handleHapus={handleHapus} />

        <div className="flex justify-end">
          <div className="font-semibold text-lg mr-4">Total: Rp {totalHarga.toLocaleString()}</div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSimpanTransaksi} className="bg-green-600 hover:bg-green-700 mt-4">
            Simpan Transaksi
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default TransaksiPenjualan;
