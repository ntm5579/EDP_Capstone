import React, { useState, useEffect, use } from "react";
import axios from "axios";
import BackButton from "../other/BackButton";
import Order from "./Order";
import MiniMovies from "../movies/MiniMovie";

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
        <div>View Orders</div>

        {data.map((data) => <MiniMovies movies={data} />)
        }
      </div>
    </>
  );
}

export default OrderHistory;
