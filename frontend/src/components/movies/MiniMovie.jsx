import { Link } from "react-router-dom";
import AddToCart from "../cart/AddToCart";
import { Star } from 'lucide-react';

//use state for movies in cart

const MiniMovies = (props) => {
  const movies = props.movies;
  return (
    <div className="grid grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="bg-gray-900 transform transition-all duration-300 hover:scale-105 hover:translate-y-1 hover:shadow-lg rounded-lg overflow-hidden shadow-lg border border-[#D62828]"
        >
          <Link to={`/movie/${movie.title}/${movie._id}`}>
            <div className="h-64 bg-[#003049] relative overflow-hidden">
              {movie.img_link ? (
                <div> 
                  <img
                  src={
                    movie.img_link ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhiDvETaJwvxVlxDXvo1lQLrYxg3MAny_O_A&s"
                  }
                  className="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black opacity-20"></div>
                </div>
               
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#D62828] to-black">
                  <span className="text-2xl font-bold text-white">
                    {movie.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-[#D62828] text-white text-sm font-bold px-2 py-1 rounded">
                    <span className="flex items-center">{movie.average_rating || "N/A"} <Star fill="white" size={10} /></span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold text-white truncate">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {new Date(movie.release_date).getFullYear("en-DE")}
              </p>

              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  <span className="ml-1 text-white">${movie.price.toFixed(2) || "?"}</span>
                </div>
                <span className="mx-2 text-gray-600">•</span>
                <span className="text-gray-400 text-sm">
                  {movie.genre && movie.genre.length > 0
                    ? movie.genre.map((genre, index) => (
                        <span key={genre}>
                          <Link className="underline" to={`/genre/${genre}`}>{genre}</Link>
                          {index < movie.genre.length - 1 && ", "}
                        </span>
                      ))
                    : "Unknown genre"}
                </span>
              </div>
            </div>
          </Link>
          <AddToCart button={props.button} data={movie} />
        </div>
      ))}
    </div>
  );
}

export default MiniMovies;
