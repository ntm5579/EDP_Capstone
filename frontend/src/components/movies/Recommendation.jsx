import React, { useState } from "react";

const Recommnedation = (props) => {
    const parent = props.movie;
    const [recommendations, setRecommendations] = useState([]);

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

    setRecommendations(movie_template) //get recommendations from api based on knn of parent movie

    return (
        <>
            <div>
                <h1>Recommendations</h1>
                {recommendations.map((movie) => (<MiniMovie key={movie.id} data={movie} />))}
            </div>
        </>
    );
};

export default Recommnedation;