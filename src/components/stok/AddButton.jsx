const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
    >
      ➕ Tambah Barang
    </button>
  );
};

export default AddButton;
