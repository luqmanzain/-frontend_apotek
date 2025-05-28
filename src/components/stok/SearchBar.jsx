const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Cari barang..."
        className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        🔍
      </div>
    </div>
  );
};

export default SearchBar;
