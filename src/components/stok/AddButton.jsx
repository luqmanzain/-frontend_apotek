const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-200"
    >
      Tambah Barang
    </button>
  );
};

export default AddButton;
