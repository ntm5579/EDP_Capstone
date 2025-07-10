import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-black text-[#F5f5f5]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-lg">
                  TrioVision
                </span>
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="py-4 px-2 font-semibold"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="py-4 px-2 font-semibold"
              >
                Order
              </Link>
              <Link
                to="/cart"
                className="py-4 px-2 font-semibold"
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
