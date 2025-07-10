import MiniMovies from "../movies/MiniMovie";
import Searchbar from "./Searchbar";
import { useState, useEffect } from "react";
import axios from 'axios'

// const sampleMovies = [
//   { id: 1, title: "Inception" },
//   { id: 2, title: "Dune" },
//   { id: 3, title: "Interstellar" },
//   { id: 4, title: "Minecraft" },
//   { id: 5, title: "The Dark Knight" },
//   { id: 6, title: "Tenet" },
// ];

function Home() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchAllMovies = async () => {
      setLoading(true)

      try {
        const res = await axios.get('http://localhost:4000/movies')
        setData(res.data)
        setFilteredMovies(res.data.slice(0, 10))
        setError(null)
      } catch (error) {
        console.log(error)
        setError("Failed to fetch movies. Please try again!")
        setData([])
        setFilteredMovies([])
      } finally {
        setLoading(false)
      }
    }

    fetchAllMovies()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(data.slice(0, 10));
    } else {
      const results = data.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(results);
    }
  }, [searchTerm, data]);

  return (
    <>
      <h1></h1>
      <section>
        {loading && <p>Loading Movies...</p>}
        {error && <p>{error}</p>}
        <Searchbar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <MiniMovies movies={FilteredMovies}/>
      </section>
    </>
  );
}

export default Home;
