import React, { useState, useEffect } from "react";
import axios from "axios";
import MiniMovies from "../movies/MiniMovie";
import BackButton from "../other/BackButton";

function OrderHistory() {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/orders");
        setData(res.data);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    fetchOrders();
  }, []);
  return (
    <>
      <div className="w-[1200px] border mx-auto mt-20 bg-black text-white p-8 rounded-lg">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="text-5xl font-black text-white">Your Orders</div>


        {data.map((cart, i) => (
          <div className="my-4" key={i}>
            <div className="text-xl font-semibold">Order Id: {cart._id}</div>
            <div className="mt-3">
              {cart.matchedMovies && cart.matchedMovies.length > 0 ? (
                <MiniMovies movies={cart.matchedMovies} />
              ) : (
                <p>No matched movies for this order.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderHistory;
