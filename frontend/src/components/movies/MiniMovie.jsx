import React, { useState } from "react";
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
                <div id="mini_poster"><img src={movie.img_link}></img></div>
                <div id="mini_info">
                    <p id="mini_title">{movie.title}</p>
                    <p id="mini_price">${movie.price}</p>
                    <button id="mini_add_button">Add to Cart</button>
                </div>
            </div>
        </>
    );
};

export default Movie;