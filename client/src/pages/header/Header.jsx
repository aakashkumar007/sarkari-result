import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux"; // Import hooks for Redux
import { clearUser, setUser } from "../../redux/authSlice"; // Import actions

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access user information from Redux state
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    // Check if the token exists in cookies to determine login status
    const checkAuthStatus = () => {
      const token = Cookies.get("token"); // Fetch the token from cookies
      if (token) {
        // Simulate fetching user info based on the token, e.g., a stored user object in cookies or a server call
        const user = { name: "prakash" }; // Replace this with actual user info from the token or server
        dispatch(setUser(user)); // Set user info in Redux
      } else {
        dispatch(clearUser()); // Clear user info if not authenticated
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    try {
      // Simulate logout by clearing cookies and Redux state
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user")

      dispatch(clearUser()); // Clear user info in Redux state
      toast.success("Logout Success");
      navigate("/signin");
    } catch (error) {
      toast.error("Error during logout");
    }
  };

  return (
    <header className="font-semibold py-4 shadow-md text-slate-800 bg-slate-200">
      <nav className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/">
          <span className="flex gap-4 pl-6">
            <img
              src="https://cdn-icons-png.freepik.com/256/15890/15890765.png?ga=GA1.1.22124692.1725342488&semt=ais_hybrid"
              alt="logo"
              className="h-13 w-12 hover:bg-slate-600 rounded-full"
            />
            <h1 className="text-xl font-bold mt-3">Sarkari Naukari</h1>
          </span>
        </Link>

        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:text-indigo-300">
            Home
          </Link>
          <Link to="/get-all-jobs" className="hover:text-indigo-300">
            Latest Jobs
          </Link>
          <Link to="/get-all-results" className="hover:text-indigo-300">
            Results
          </Link>
          <Link to="/get-all-admit-cards" className="hover:text-indigo-300">
            Admit Card
          </Link>
          <Link to="#answer-key" className="hover:text-indigo-300">
            Answer Key
          </Link>
          <Link to="#syllabus" className="hover:text-indigo-300">
            Syllabus
          </Link>
          <Link to="#search" className="hover:text-indigo-300">
            Search
          </Link>
          <Link to="#contact" className="hover:text-indigo-300">
            Contact Us
          </Link>

          {/* Conditionally render Dashboard or Sign In based on Redux user state */}
          {userInfo ? (
            <>
              <Link
                to="/dashboard"
                className="bg-slate-800 p-2 hover:rounded-full hover:text-yellow-100 text-white"
              >
                Hello! Prakash
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-slate-800 p-2 hover:rounded-full hover:text-yellow-100 text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="bg-slate-800 p-2 hover:rounded-full hover:text-yellow-100 text-white"
            >
              Sign In
            </Link>
          )}
        </div>

        <div className="lg:hidden relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span>Menu</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-lg w-48">
              {/* Mobile Menu Links */}
              <li>
                <Link to="/" className="block px-4 py-2 hover:bg-indigo-100">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/get-all-results"
                  className="block px-4 py-2 hover:bg-indigo-100"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link
                  to="/get-all-admit-cards"
                  className="block px-4 py-2 hover:bg-indigo-100"
                >
                  Admit Cards
                </Link>
              </li>

              {userInfo ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-indigo-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 hover:bg-indigo-100 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/signin"
                    className="block px-4 py-2 hover:bg-indigo-100"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
