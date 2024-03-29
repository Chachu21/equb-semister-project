import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Links = [
  { name: "Home", url: "/" },
  { name: "Group", url: "/group" },
  { name: "About", url: "/about" },
  // { name: "AdminDashboard", url: "/admin" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 dark:text-white z-50 sticky top-0 start-0 left-0 w-full backdrop-filter backdrop-blur-lg shadow-none md:shadow-sm">
      <nav className="relative flex justify-between items-center container mx-auto py-1 md:py-4">
        <div>
          <NavLink
            to="/"
            className="font-pacifico flex flex-col items-center text-[#008B8B]"
          >
            {/* <img
              src="/equb1.jpg"
              alt="logo"
              className="h-12 w-12 rounded-full"
            /> */}
            <h1 className="font-medium text-3xl">Equb</h1>
            <p className="font-medium text-2xl">እቁብ</p>
          </NavLink>
        </div>
        <div className={isOpen ? "flex" : " hidden md:flex"}>
          <ul
            className="flex text-xl container font-medium bg-white dark:bg-gray-900 dark:text-white absolute md:relative flex-col md:flex-row md:space-x-5 w-full shadow md:shadow-none text-center top-[70px] left-0 md:top-0 md:flex"
            onClick={toggleNavbar}
          >
            {Links.map((link) => (
              <NavLink
                key={link.name}
                to={link.url}
                className="px-3 py-2 cursor-pointer rounded hover:bg-[#7da7a7] hover:text-white focus:text-[#7da7a7]"
              >
                {link.name}
              </NavLink>
            ))}
            <div
              className={
                isOpen
                  ? " flex justify-center items-center md:hidden"
                  : "hidden"
              }
            >
              <button
                onClick={toggleNavbar}
                className="bg-[#008B8B] hover:bg-[#7da7a7] p-2 text-white rounded-lg w-24 h-8 mb-4 flex justify-center items-center"
              >
                <Link to="/login">Sign In</Link>
              </button>
            </div>
          </ul>
        </div>
        <div className="hidden md:flex">
          <button className="bg-[#008B8B] hover:bg-[#7da7a7] p-2 text-white rounded-lg w-24 h-8 flex justify-center items-center">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
        <div className="md:hidden">
          <button
            className="flex justify-center items-center"
            onClick={toggleNavbar}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isOpen ? "hidden" : "flex"}
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isOpen ? "flex" : "hidden"}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
