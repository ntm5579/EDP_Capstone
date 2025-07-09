import MiniMovies from "../movies/MiniMovie";
import Searchbar from "./Searchbar";
import { useState, useEffect } from "react";

const sampleMovies = [
  { id: 1, title: "Inception" },
  { id: 2, title: "Dune" },
  { id: 3, title: "Interstellar" },
  { id: 4, title: "Minecraft" },
  { id: 5, title: "The Dark Knight" },
  { id: 6, title: "Tenet" },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(sampleMovies.slice(0, 10));
    } else {
      const results = sampleMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(results);
    }
  }, [searchTerm]);

  return (
    <>
      <h1></h1>
      <section>
        <Searchbar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <MiniMovies movies={FilteredMovies}/>
      </section>
    </>
  );
}

export default Home;
