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
    <div className="min-h-screen bg-white text-black font-sans">
      <Router>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/movie/title=:title" element={<Movie />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
