function MiniMovies({ movies }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie._id}
            className="h-[50px]  border rounded text-center"
          >
            <h1>{movie.title}</h1>
            <button>Add to Cart</button>
          </div>
        ))
      ) : (
        <p className="col-span-5">No Movies found</p>
      )}
    </div>
  );
}

export default MiniMovies;
