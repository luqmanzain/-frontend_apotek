import React, { useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TableHeader from "./TableHeader";
import TableData from "./TableData";

// Helper buat format angka ke format Rupiah
const formatRupiah = (angka) => {
  return "Rp " + (angka || 0).toLocaleString("id-ID");
};

const TableKeranjang = ({ keranjang = [], handleHapus }) => {
  const refsKeranjang = useRef([]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <TableHeader title="Nama Produk" />
            <TableHeader title="Harga Satuan" />
            <TableHeader title="Jumlah" />
            <TableHeader title="Subtotal" />
            <th className="px-4 py-2 border"></th>
          </tr>
        </thead>
        <TransitionGroup component="tbody">
          {keranjang.length > 0 ? (
            keranjang.map((item, index) => {
              if (!refsKeranjang.current[index]) {
                refsKeranjang.current[index] = React.createRef();
              }

              const harga = item.hargaJual || 0;
              const jumlah = item.jumlah || 0;
              const subtotal = harga * jumlah;

              return (
                <CSSTransition
                  key={index}
                  nodeRef={refsKeranjang.current[index]}
                  timeout={300}
                  classNames="fade"
                >
                  <tr ref={refsKeranjang.current[index]} className="border-t">
                    <TableData>{item.namaBarang || "-"}</TableData>
                    <TableData>{formatRupiah(harga)}</TableData>
                    <TableData>{jumlah}</TableData>
                    <TableData>{formatRupiah(subtotal)}</TableData>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleHapus(index)}
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                </CSSTransition>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Keranjang kosong
              </td>
            </tr>
          )}
        </TransitionGroup>
      </table>
    </div>
  );
};

export default TableKeranjang;
