import Searchbar from "./Searchbar";
import { useState, useEffect } from "react";

const sampleMovies = [
  { id: 1, title: "Inception" },
  { id: 2, title: "Interstellar" },
  { id: 3, title: "The Dark Knight" },
  { id: 4, title: "Tenet" },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // if empty keep array empty
    if (searchTerm === "") {
      setFilteredMovies([]);
    } else {
      const res = sampleMovies.filter((movie) =>
        movie.title.includes(searchTerm)
      );
      setFilteredMovies(res);
    }
  }, [searchTerm]);

  return (
    <>
      <h1></h1>
      <section>
        <Searchbar searchTerm={searchTerm} onSearch={setSearchTerm} />

        <div>
          {FilteredMovies.length > 0 ? (
            FilteredMovies.map(movie => (
              <div key={movie.id}>
                {movie.title}
              </div>
            ))
          ): (
            <p>NoMoives found</p>
          )}
          </div>
      </section>
    </>
  );
}

export default Home;
