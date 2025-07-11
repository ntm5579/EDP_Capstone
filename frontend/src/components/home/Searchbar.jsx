import { useNavigate } from "react-router-dom";

function Searchbar({ genre, searchTerm, onSearch }) {
  const navigate = useNavigate();

  const handleGenreSelect = (genre) => {
    navigate(`/genre/${genre}`);
  };

  return (
    <div className="w-fit mx-auto pb-20 pt-10">
      <input
        type="text"
        className=" w-[700px] h-[50px] text-lg placeholder:text-black font-semibold bg-white border-2 border-black p-4 pl-10 rounded-lg"
        placeholder="🔎︎ Search by... Title, Genre, or Director"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="mt-2">
        <select
          className="border px-4 py-2 rounded-md bg-black text-white font-semibold"
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
    </div>
  );
}

export default Searchbar;
