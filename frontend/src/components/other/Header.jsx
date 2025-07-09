import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">
                  TrioVision
                </span>
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="py-4 px-2 text-blue-500 border-b-2 border-blue-500 font-semibold"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
              >
                Order
              </Link>
              <Link
                to="/contact"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
              >
                Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
