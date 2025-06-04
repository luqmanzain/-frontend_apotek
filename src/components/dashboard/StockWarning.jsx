import React from "react";
import { useAppContext } from "../../context/AppContext";

const StockWarning = ({ threshold = 5, asCard = false }) => {
  const { stocks } = useAppContext();
  const lowStockItems = stocks.filter((item) => item.stock < threshold);

  if (lowStockItems.length === 0) return null;

  if (asCard) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500">
        <h2 className="text-md font-semibold text-red-600 mb-2">
          Peringatan Stok Rendah
        </h2>
        <ul className="text-sm text-gray-700 space-y-1">
          {lowStockItems.map((item) => (
            <li key={item.id}>
              {item.namaBarang} — Stok: {item.stock}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-red-100 p-4 rounded-md mb-6">
      <h2 className="text-lg font-semibold text-red-600 mb-2">
        Peringatan Stok Rendah
      </h2>
      <ul className="text-sm text-red-800 space-y-1">
        {lowStockItems.map((item) => (
          <li key={item.id}>
            {item.namaBarang} — Stok: {item.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockWarning;
