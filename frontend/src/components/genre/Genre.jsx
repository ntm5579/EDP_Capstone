import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MiniMovies from "../movies/MiniMovie";
import BackButton from "../other/BackButton";

function Genre() {
  const { genre } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/genre/${genre}/movies`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
        setData(null);
      }
    };

    fetchMovie();
  }, [genre]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = data.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / moviesPerPage);

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
    <div className="w-[1200px] border mx-auto mt-20 bg-black text-white p-8 rounded-lg">
       <div className="mb-4">
          <BackButton />
        </div>
      <h1 className="text-5xl font-black text-white mb-4">Genre: {genre}</h1>
      <div>
        <MiniMovies movies={currentMovies} />
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
      </div>
    </div>
  );
}

export default Genre;
