import MiniMovies from "../movies/MiniMovie";
import Searchbar from "./Searchbar";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/logo.jpg"

function Home() {
  const [data, setData] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/movies");
        setData(res.data);
        setFilteredMovies(res.data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch movies. Please try again!");
        setData([]);
        setFilteredMovies([]);
      } finally {
        setLoading(false);
      }
    };
    const fetchAllGenres = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/genres");
        setAllGenres(res.data);
      } catch (error) {
        console.log(error);
        setAllGenres([]);
      }
    };
    fetchAllMovies();
    fetchAllGenres();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(data);
    } else {
      const results = data.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre.some((genre) =>
            genre.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredMovies(results);
    }
  }, [searchTerm, data]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const getPaginationRange = () => {
    const range = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (totalPages <= 5) {
      start = 1;
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };


  return (
    <>
      <h1></h1>
      <section className="h-fit">
      <div className="mx-auto mt-10 w-fit">
        <img
          src={logo}
          alt="TrioVision Logo"
          className="h-40 w-auto object-contain rounded-md shadow-md"
        />
      </div>

        <Searchbar genre={allGenres} searchTerm={searchTerm} onSearch={setSearchTerm} />
        
        {loading && (
          <h3 className="mt-2 text-center text-xl font-medium text-black">
            Movies loading...
          </h3>
        )}
        {error && (
          <h3 className="mt-2 text-center text-xl font-medium text-black">
            {error}
          </h3>
        )}
        <MiniMovies button="Add" movies={currentMovies} />
        <div className="flex justify-center font-bold space-x-2 mt-4">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="border px-2 py-1.5 rounded-lg bg-[#D62828] text-white hover:bg-red-800 cursor-pointer"
            >
              Previous
            </button>
          )}

          {getPaginationRange().map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`cursor-pointer ${
                page === currentPage
                  ? "underline decoration-[#D62828] font-black"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="border px-2 py-1.5 rounded-lg bg-[#D62828] text-white hover:bg-red-800 cursor-pointer"
            >
              Next
            </button>
          )}
        </div>
      </section>
    </>
  );
}
//recommit
export default Home;
