import MiniMovies from "../movies/MiniMovie";
import Searchbar from "./Searchbar";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);

      try {
        const res = await axios.get("http://localhost:4000/movies");
        setData(res.data);
        setFilteredMovies(res.data.slice(0, 10));
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

    fetchAllMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(data.slice(0, 10));
    } else {
      const results = data.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(results.slice(0, 10));
    }
  }, [searchTerm, data]);

  return (
    <>
      <h1></h1>
      <section className="h-fit">
        <Searchbar searchTerm={searchTerm} onSearch={setSearchTerm} />
        {loading && (
          <h3 className="mt-2 text-center text-xl font-medium text-black">
            Movies loading...
          </h3>
        )}
        {error && (
          <h3 className="mt-2 text-center text-xl font-medium text-black">{error}</h3>
        )}
        <MiniMovies movies={FilteredMovies} />
      </section>
    </>
  );
}

export default Home;
