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
            } catch (error) {
                console.log(error);
                setData([]);
            }
        };

        fetchCart();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        try {
            const res = await axios.post(`http://localhost:4000/api/order`);
            window.location.reload();

            //console.log(data);
            // Handle post submission logic (like showing a success message)
        } catch (error) {
            console.error("Error posting data", error);
            // Handle errors here
        }

    };

    return (
        <>
            <div>
                <h1>Your Cart</h1>
                <MiniMovies button="Remove" movies={data} />
            </div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input name="name"></input>
                <label>Email</label>
                <input name="mail"></input>
                <label>Address</label>
                <input name="address"></input>
                <label>Credit Card Number</label>
                <input name="credit_card"></input>
                <button type="submit">Order</button>
            </form>

        </>
    );
}

export default Cart;