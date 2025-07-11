import React, { useState, useEffect } from "react";
import axios from "axios";
import MiniMovies from "../movies/MiniMovie";
import BackButton from "../other/BackButton";

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

    const formData = {
      name: e.target.name.value,
      email: e.target.mail.value,
      address: e.target.address.value,
      credit_card: e.target.credit_card.value,
    };

    console.log(formData);

    const orderData = {
      ...formData,
      items: data.map((item) => ({
        title: item.title,
        price: item.price,
      })),
      total: data.reduce((total, item) => total + (item.price || 0), 0),
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/api/order`,
        orderData
      );

      if (res.status === 200) {
        window.location.reload();

        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
      alert("Error");
    }
  };

  return (
    <>
      <div className="w-[1200px] flex flex-row max-w-full mx-auto mt-20 bg-black text-white p-8 rounded-lg shadow-lg">
        <div className="w-[60%]">
          <div className="mb-4">
            <BackButton />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Checkout Page
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-lg font-bold">Name</label>
              <input
                name="name"
                type="text"
                className="w-[350px] p-3 mt-2 bg-white text-black placeholder:text-black rounded-lg border"
                placeholder="Enter your full name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Email</label>
              <input
                name="mail"
                type="email"
                className="w-[550px] p-3 mt-2 bg-white text-black placeholder:text-black rounded-lg border"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="text-lg font-bold">
                Address
              </label>
              <input
                name="address"
                type="text"
                className="w-[550px] p-3 mt-2 bg-white text-black placeholder:text-black rounded-lg border"
                placeholder="Enter your address"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Credit Card Number</label>
              <input
                name="credit_card"
                type="text"
                className="w-[550px] p-3 mt-2 bg-white text-black placeholder:text-black rounded-lg border"
                placeholder="Enter your credit card number"
              />
            </div>
            <button
              type="submit"
              className=" w-fit bg-[#D62828] hover:cursor-pointer hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              Order
            </button>
          </form>
        </div>
        <div className="w-[40%]">
          {data && data.length > 0 && (
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-white mb-4">Total</h1>
              <div>
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4"
                  >
                    <span className="text-lg">{item.title}</span>
                    <span className="text-lg">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-xl">Total:</span>
                <span className="text-xl font-semibold">
                  $
                  {data
                    .reduce((total, item) => total + (item.price || 0), 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {data && data.length > 0 && (
        <div className="w-[1200px] max-w-full mx-auto mt-10 bg-black text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-7">Items</h1>
          <div>
            <MiniMovies button="Remove" movies={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
