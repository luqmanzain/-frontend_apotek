import React from "react";
import ReactDOM from "react-dom";

const DetailModal = ({ selectedDetail, onClose }) => {
  if (!selectedDetail) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Detail Transaksi
        </h2>

        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <span className="font-medium">Tanggal:</span>{" "}
            {selectedDetail.tanggal || "-"}
          </div>
          <div>
            <span className="font-medium">Jenis:</span>{" "}
            {selectedDetail.jenis || "-"}
          </div>
          <div>
            <span className="font-medium">Total:</span>{" "}
            Rp {selectedDetail.total?.toLocaleString("id-ID") || "0"}
          </div>
          <div>
            <span className="font-medium">Keterangan:</span><br />
            {selectedDetail.keterangan || "-"}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DetailModal;
