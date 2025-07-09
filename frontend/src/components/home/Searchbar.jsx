function Searchbar({ searchTerm, onSearch }) {
  return (
    <div>
      <input
        type="text"
        className="w-full p-4 pl-10 rounded-lg border"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;
