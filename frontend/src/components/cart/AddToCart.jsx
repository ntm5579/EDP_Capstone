import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

async function submit(movie, button) {
    let append;
    if (button === "Add") {
        append = "";
    }
    else {
        console.log("removing");
        append = "/remove";
    }
    const res = await axios.post(`http://localhost:4000/api/cart${append}/${movie._id}`);
    if (button === "Remove") {
        window.location.reload(); //replace with proper code to fix deletion needing reload
    }
}

const AddToCart = (props) => {
    const movie = props.data;
    const button = props.button;

    return (
        <>
            <div className="px-4 pb-4">
                <button className="w-full bg-[#D62828] hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center" onClick={() => submit(movie, button)} >
                    {button === "Add" ? "Add to Cart" : "Remove"}
                </button>
            </div >
        </>
    );
}

export default AddToCart;