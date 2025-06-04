import { FaEdit, FaTrash } from "react-icons/fa";

const StockTable = ({ stocks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Nama Barang</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Stok</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Harga Beli</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Harga Jual</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Exp Date</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length > 0 ? (
            stocks.map((stock) => (
              <tr key={stock.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">{stock.id}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{stock.namaBarang}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{stock.stock}</td>
                <td className="py-3 px-4 text-sm text-gray-900">Rp {stock.hargaBeli.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-gray-900">Rp {stock.hargaJual.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{stock.expDate || "-"}</td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(stock)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(stock.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-500">
                Tidak ada barang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
