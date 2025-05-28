import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api.js';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    fetchStocks();
    fetchLaporan();
  }, []);

  // Fetch produk dari backend
  const fetchStocks = async () => {
    try {
      const response = await api.get("/produk");
      const data = response.data.map(item => ({
        id: item.id,
        namaBarang: item.namaProduk,
        stock: item.stok,
        hargaBeli: item.hargaBeli,
        hargaJual: item.hargaJual,
      }));
      setStocks(data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    }
  };

  // Fetch laporan dari backend
  const fetchLaporan = async () => {
    try {
      const response = await api.get("/transaksi");
      setLaporan(response.data);
    } catch (error) {
      console.error("Gagal mengambil laporan transaksi:", error);
    }
  };

  // Tambah produk dan catat ke laporan
  const addStock = async (newStock) => {
    try {
      await api.post("/produk", {
        namaProduk: newStock.namaBarang,
        stok: newStock.stock,
        hargaBeli: newStock.hargaBeli,
        hargaJual: newStock.hargaJual,
      });
      fetchStocks();

      // Kirim laporan pengeluaran ke backend
      await api.post("/transaksi", {
        tanggal: new Date().toISOString().slice(0, 10),
        jenis: "Pengeluaran",
        total: newStock.hargaBeli * newStock.stock,
        keterangan: `Pembelian ${newStock.namaBarang}`,
      });

      fetchLaporan();
    } catch (error) {
      console.error("Gagal menambah produk:", error);
    }
  };

  // Update produk
  const updateStock = async (updatedStock) => {
    try {
      // Ambil data stok lama terlebih dahulu
      const oldStock = stocks.find(item => item.id === updatedStock.id);

      await api.put(`/produk/${updatedStock.id}`, {
        namaProduk: updatedStock.namaBarang,
        stok: updatedStock.stock,
        hargaBeli: updatedStock.hargaBeli,
        hargaJual: updatedStock.hargaJual,
      });

      // Jika stok bertambah, catat ke laporan sebagai pengeluaran
      const penambahanStok = updatedStock.stock - oldStock.stock;
      if (penambahanStok > 0) {
        await api.post("/transaksi", {
          tanggal: new Date().toISOString().slice(0, 10),
          jenis: "Pengeluaran",
          total: updatedStock.hargaBeli * penambahanStok,
          keterangan: `Penambahan stok ${updatedStock.namaBarang}`,
        });

        await fetchLaporan();
      }

      fetchStocks();
    } catch (error) {
      console.error("Gagal update produk:", error);
    }
  };

  // Hapus produk
  const deleteStock = async (id) => {
    try {
      await api.delete(`/produk/${id}`);
      fetchStocks();
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };

  // Fungsi untuk melakukan penjualan
  const sellProduct = async (items, nomorTransaksi, tanggalTransaksi, kasir = "Admin") => {
    try {
      // Kurangi stok via backend
      await api.post("/produk/kurangi-stok", items.map(item => ({
        id: item.id,
        jumlah: item.jumlah
      })));

      // Hitung total dan simpan ke state transaksi
      const total = items.reduce((sum, item) => sum + item.hargaJual * item.jumlah, 0);
      const transaksiBaru = { nomorTransaksi, tanggalTransaksi, kasir, items, total };
      setTransaksi((prev) => [...prev, transaksiBaru]);

      // Kirim laporan pemasukan ke backend
      await api.post("/transaksi", {
        tanggal: tanggalTransaksi,
        jenis: "Pemasukan",
        total: total,
        keterangan: `Penjualan ${items.map(item => item.namaBarang).join(", ")}`,
      });

      fetchStocks();
      fetchLaporan();
    } catch (error) {
      console.error("Gagal melakukan transaksi penjualan:", error);
    }
  };

  return (
    <AppContext.Provider value={{
      stocks,
      transaksi,
      laporan,
      addStock, // Tambah produk
      updateStock, // Update produk (stok, harga)
      deleteStock, // Hapus produk
      sellProduct // Jual produk
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
