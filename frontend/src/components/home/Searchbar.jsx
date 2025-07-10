function Searchbar({ searchTerm, onSearch }) {
  return (
    <div className="w-fit mx-auto py-20">
      <input
        type="text"
        className=" w-[700px] h-[100[px] text-lg placeholder-white text-white font-semibold bg-black p-4 pl-10 rounded-lg"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;
