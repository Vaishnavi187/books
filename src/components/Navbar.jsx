import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      document.body.style.backgroundColor = "black"; // Set background to black
    } else {
      element.classList.remove("dark");
      document.body.style.backgroundColor = "white"; // Set background to white
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li className="text-lg font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="text-lg font-semibold">
        <Link to="/course">Course</Link>
      </li>
      <li className="text-lg font-semibold">
        <Link to="/contact">Contact</Link>
      </li>
    </>
  );

  return (
    <div className="w-full fixed top-0 left-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 z-50 ${
          sticky
            ? "shadow-md bg-white dark:bg-gray-800  dark:text-white transition-all duration-300 "
            : ""
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <GiHamburgerMenu />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white dark:bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-bold cursor-pointer">
              Bookstore
            </Link>
          </div>

          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            <div className="hidden md:block">
              <label className="px-3 py-2 border rounded-md flex items-center gap-2 bg-gray-200  dark:bg-black">
                <input
                  type="text"
                  className="grow outline-none bg-transparent"
                  placeholder="Search"
                />
                <IoMdSearch className="text-black dark:text-white" />
              </label>
            </div>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black border border-gray-400"
              }`}
            >
              {theme === "light" ? (
                <FiSun className="text-xl" />
              ) : (
                <IoMoonOutline className="text-xl" />
              )}
            </button>

            {/* Authentication Buttons */}
            {authUser ? (
              <Logout />
            ) : (
              <div className="navbar-end">
                <Link
                  to="/login"
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
