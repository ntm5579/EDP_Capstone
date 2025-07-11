import { useNavigate } from "react-router-dom";

function Searchbar({ genre, searchTerm, onSearch }) {
  const navigate = useNavigate();

  const handleGenreSelect = (genre) => {
    if (genre) navigate(`/genre/${genre}`);
  };

  return (
    <div className="w-full flex flex-col items-center pb-10 pt-6 gap-4">
      {/* Search input */}
      <input
        type="text"
        className="w-[90%] max-w-xl text-black text-lg placeholder-gray-500 border border-gray-300 bg-white p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        placeholder="Search by... Title, Genre, or Director"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Genre dropdown */}
      <select
        className="w-[90%] max-w-xl text-black text-md font-medium border border-gray-300 bg-white p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        onChange={(e) => handleGenreSelect(e.target.value)}
      >
        <option value="">Select Genre</option>
        {genre.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Searchbar;
