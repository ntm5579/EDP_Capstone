import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import AddToCart from "../cart/AddToCart";
import MiniMovies from "./MiniMovie";
import BackButton from "../other/BackButton";
// import Recommendation from "Recommendation"

const Movie = () => {
  const [data, setData] = useState([]);
  const [directorMovies, setdirectorMovies] = useState([]);
  const [recommendedData, setrecommendedData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/movies/${id}`);
        setData(res.data[0]);
      } catch (error) {
        console.log(error);
        setData(null);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/movies/recommendations/${id}`
        );
        setrecommendedData(res.data);
      } catch (error) {
        console.log(error);
        setrecommendedData(null);
      }
    };

    fetchRecommendations();
  }, [id]);

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/director/${data.director}/movies`
        );
        setdirectorMovies(res.data);
      } catch (error) {
        console.log(error);
        setdirectorMovies(null);
      }
    };

    fetchDirector();
  }, [data.director]);

  return (
    <>
      <div className="w-[1200px] border mx-auto mt-20 bg-black text-white p-8 rounded-lg">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex flex-row ">
          <div className="gap-6 w-[65%] flex flex-col">
            <h1 className="text-5xl font-black text-white">{data.title}</h1>
            <h2 className="text-3xl font-bold text-white">Director: {data.director}</h2>
            <div className="flex flex-wrap gap-4 text-lg">
              <div className="flex font-semibold items-center">
                <span className="text-[#D62828] mr-2">Release Date:</span>
                <span>{new Date(data.release_date).getFullYear("en-DE")}</span>
              </div>

              <div className="flex font-semibold items-center">
                <span className="text-[#D62828] mr-2">Genre:</span>
                <span>
                  {data.genre && data.genre.length > 0
                    ? data.genre.map((genre, index) => (
                        <span key={genre}>
                          <Link className="underline" to={`/genre/${genre}`}>
                            {genre}
                          </Link>
                          {index < data.genre.length - 1 && ", "}
                        </span>
                      ))
                    : "Unknown genre"}
                </span>
              </div>

              <div className="flex font-semibold items-center">
                <span className="text-[#D62828] mr-2">Rating:</span>
                <span>{data.average_rating}/10</span>
              </div>
            </div>
            <div className="mt-4 font-semibold">
              <h3 className="text-lg font-semibold text-[#D62828] mb-2">
                Description
              </h3>
              <p className="text-gray-200 leading-relaxed">
                {data.description}
              </p>
            </div>
            <div className="mt-4">
              <span className="text-[#D62828] font-bold text-lg mr-2">
                Price:
              </span>
              <span className="text-lg">${data.price?.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex">
              <div>
                <Link
                  to={data.trailer_link}
                  className="w-fit bg-[#D62828] hover:cursor-pointer hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </Link>
              </div>
              <AddToCart button="Add" data={data} />
            </div>
          </div>
          <div className="w-[50%]">
                  <img
                  src={
                    data.img_link
                  }
                  className="w-full h-[600px] object-contain "
                />
          </div>
        </div>
      </div>

      {recommendedData && recommendedData.length > 0 && (
        <div className="w-[1200px] border mx-auto mt-5 bg-black text-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-white mb-7 w-fit ">
            Similar Movies to {data.title}
          </h1>
          <div>
            <MiniMovies
              button="Add"
              movies={recommendedData.filter(
                (movie) => movie.title !== data.title
              )}
            />
          </div>
        </div>
      )}

      {directorMovies && directorMovies.length > 0 && (
        <div className="w-[1200px] border mx-auto mt-5 bg-black text-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-white mb-7 w-fit ">
            Movies by {data.director}
          </h1>
          <div>
            <MiniMovies
              button="Add"
              movies={directorMovies.filter(
                (movie) => movie.title !== data.title
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
