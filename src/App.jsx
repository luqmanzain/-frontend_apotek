import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import EditProfile from "./pages/profile/profile";
import StokProduk from "./pages/stokProduk/stokProduk";
import TransaksiPenjualan from "./pages/transaksiPenjualan/transaksiPenjualan";
import LaporanTransaksi from "./pages/laporanTransaksi/laporanTransaksi";
import TambahStok from "./pages/tambahStok/TambahStok";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/stock-product" element={<StokProduk />} />
          <Route path="/transaksi-penjualan" element={<TransaksiPenjualan />} />
          <Route path="/laporan-transaksi" element={<LaporanTransaksi />} />
          <Route path="/tambah-stok" element={<TambahStok />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
