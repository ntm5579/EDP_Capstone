import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg"; 

function Header() {
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-0">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center space-x-10">
            {/* Logo all the way to the left */}
            <Link to="/" className="pl-4">
              <img
                src={logo}
                alt="TrioVision Logo"
                className="h-16 w-auto object-contain rounded-md"
              />
            </Link>

            <div className="flex space-x-8 text-lg font-bold">
              <Link
                to="/"
                className="hover:text-red-400 transition duration-200 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                  <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                </svg>
                Home
              </Link>

              <Link
                to="/order"
                className="hover:text-red-400 transition duration-200 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                  <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
                </svg>
                Order
              </Link>
            </div>
          </div>

                {/* Cart on the right */}
                <Link
                  to="/cart"
                  className="text-lg font-bold hover:text-red-400 transition duration-200 flex items-center gap-1 pr-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                 
                </Link>

        </div>
      </div>
    </nav>
  );
}

export default Header;