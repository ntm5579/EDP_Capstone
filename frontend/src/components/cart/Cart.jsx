import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MiniMovies from "../Movies/MiniMovie";

const Cart = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchCart = async () => {

            try {
                const res = await axios.get("http://localhost:4000/api/cart");
                setData(res.data);
                //map movie_ids and do api request for all
            } catch (error) {
                console.log(error);
                setData([]);
            }
        };

        fetchCart();
    }, []);


    return (
        <>
            <h1>Your Cart</h1>
            <MiniMovies button="Remove" movies={data} />
        </>
    );
}

export default Cart;