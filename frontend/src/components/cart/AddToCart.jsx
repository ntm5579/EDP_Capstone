import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

async function submit(movie) {
    console.log(movie);
    //send api request to put in mongo

    try {
        const res = await axios.get(`http://localhost:4000/api/cart/${movie._id}`);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hmm, something doesn\'t seem right... deleting your movie from cart');
    }
}

const AddToCart = (props) => {
    const movie = props.data;

    //const [movie, setMovie] = useState([]);
    return (
        <>
            <div className="px-4 pb-4">
                <button className="w-full bg-[#D62828] hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center" onClick={() => submit(movie)} >
                    Add to Cart
                </button>
            </div >
        </>
    );
}

export default AddToCart;