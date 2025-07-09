import React, { useState } from "react";
import Recommendation from "Recommendation"

const Movie = (props) => {
    const movie = props.data;

    const movie_template = { //how to structure a movie for the db
        "title": "",
        "director": "",
        "release_date": "Date object",
        "genre": [],
        "average_rating": 0.0,
        "description": "",
        "price": 0.0,
        "img_link": "",
        "trailer_link": ""

    }

    return (
        <>
            <div>
                <div id="trailer/poster"></div>
                <div id="info">
                    <h1 id="title">{movie.title}</h1>
                    <h3 id="director">Director: {movie.director}</h3>
                    <p id="average_rating">{movie.average_rating}/5★</p>
                    <p id="price">${movie.price}</p>
                    <button id="add_button">Add to Cart</button>
                </div>
                <div id="description"><p id="description">{movie.description}</p></div>
            </div>
            <Recommendation movie="Test" />
        </>
    );
};

export default Movie;