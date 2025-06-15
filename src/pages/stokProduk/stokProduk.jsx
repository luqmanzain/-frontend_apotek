import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import { useAppContext } from "../../context/AppContext";
import StockTable from "../../components/stok/StockTable";
import SearchBar from "../../components/stok/SearchBar";
import AddButton from "../../components/stok/AddButton";
import AddModal from "../../components/stok/AddModal";
import EditModal from "../../components/stok/EditModal";

const StokProduk = () => {
  const { stocks, addStock, updateStock, deleteStock } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleOpenEditModal = (stock) => {
    setSelectedStock(stock);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedStock(null);
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.namaBarang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmed = window.confirm("Apakah Anda yakin akan menghapus produk ini?");
    if (confirmed) {
      deleteStock(id);
    }
  };

  return (
    <Sidebar titlePage="Stock Produk">
      <div className="p-6 space-y-6">
        {/* Header Atas Table */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchBar value={searchTerm} onChange={handleSearch} />
          <AddButton onClick={handleOpenAddModal} />
        </div>

        {/* Tabel */}
        <StockTable
          stocks={filteredStocks}
          onEdit={handleOpenEditModal}
          onDelete={handleDelete}
        />
      </div>

      <AddModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSave={addStock}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        stock={selectedStock}
        onSave={updateStock}
      />
    </Sidebar>
  );
};

export default StokProduk;
