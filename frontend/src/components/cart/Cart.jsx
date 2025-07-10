import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Recommendation from "Recommendation"

const Cart = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    return (
        <>
            <h1>Cart id:{id}</h1>
        </>
    );
}

export default Cart;