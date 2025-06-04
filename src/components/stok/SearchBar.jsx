import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-1/3">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Cari nama barang..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <FiSearch className="text-lg" />
      </div>
    </div>
  );
};

export default SearchBar;
