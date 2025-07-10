import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Recommendation from "Recommendation"

const Movie = () => {
  const [data, setData] = useState([]);
  const [directorMovies, setdirectorMovies] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/movies/${id}`);
        setLoading(true);
        setData(res.data[0]);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch movie Details. Please try again!");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
        const fetchDirector = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/director/${data.director}/movies`);
        setdirectorMovies(res.data[0]);
      } catch (error) {
        console.log(error);
        setdirectorMovies(null);
      }
    };

    fetchDirector()
  }, [data.director])

  console.log(data);

  return (
    <>
      <div className="w-[800px] h-[800px] border mx-auto mt-20 bg-black text-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-black text-white">{data.title}</h1>
          <h2 className="text-3xl font-bold text-white">{data.director}</h2>
          <div className="flex flex-wrap gap-4 text-lg">
            <div className="flex items-center">
              <span className="text-[#D62828] mr-2">Release Date:</span>
              <span>{data.release_date}</span>
            </div>

            <div className="flex items-center">
              <span className="text-[#D62828] mr-2">Genre:</span>
              <span>{data.genre}</span>
            </div>

            <div className="flex items-center">
              <span className="text-[#D62828] mr-2">Rating:</span>
              <span>{data.average_rating}/10</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-[#D62828] mb-2">
              Description
            </h3>
            <p className="text-gray-200 leading-relaxed">{data.description}</p>
          </div>
          <div className="mt-4">
            <span className="text-[#D62828] font-bold text-xl mr-2">Price:</span>
            <span className="text-2xl">${data.price}</span>
          </div>
          <div className="mt-6">
            <a
              href={data.trailer_link}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Trailer
            </a>
          </div>
        </div>
        <div>
            Recommendations
        </div>
        <div>
            Movies by {data.director}
            <div></div>
        </div>
      </div>
    </>
  );
};

export default Movie;
