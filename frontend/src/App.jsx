import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/other/Footer";
import Header from "./components/other/Header";
import Movie from "./components/movies/Movie";
import Cart from "./components/cart/Cart";
import Genre from "./components/genre/Genre";
import OrderHistory from "./components/order/OrderHistory";

function App() {
  return (
    <>
      <div className="min-h-screen text-black">
        <Router>
          <Header />
          <main className="mx-auto container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:title/:id" element={<Movie />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/genre/:genre" element={<Genre />} />
              <Route path="/orders" element={<OrderHistory />}/>
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
