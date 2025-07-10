import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/other/Footer";
import Header from "./components/other/Header";
import Movie from "./components/movies/Movie";
import Cart from "./components/cart/Cart";

function App() {
  return (
    <>
      <div className="min-h-screen bg-[#F5f5f5] text-black">
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:title/:id" element={<Movie />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
