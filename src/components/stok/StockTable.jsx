import { FaEdit, FaTrash } from "react-icons/fa";

const StockTable = ({ stocks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Nama Barang</th>
            <th className="py-2 px-4 border">Stok</th>
            <th className="py-2 px-4 border">Harga Beli</th>
            <th className="py-2 px-4 border">Harga Jual</th>
            <th className="py-2 px-4 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length > 0 ? (
            stocks.map((stock) => (
              <tr key={stock.id} className="text-center">
                <td className="py-2 px-4 border">{stock.namaBarang}</td>
                <td className="py-2 px-4 border">{stock.stock}</td>
                <td className="py-2 px-4 border">Rp {stock.hargaBeli.toLocaleString()}</td>
                <td className="py-2 px-4 border">Rp {stock.hargaJual.toLocaleString()}</td>
                <td className="py-2 px-4 border space-x-2">
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
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
