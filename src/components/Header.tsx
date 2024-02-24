import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Links = [
  { name: "Home", url: "/" },
  { name: "Group", url: "/group" },
  { name: "About", url: "/about" },
  { name: "AdminDashboard", url: "/admindashboard" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white z-50 sticky top-0 start-0 left-0 w-full px-[50px] border-b border-gray-200 dark:border-gray-600 dark:bg-gray-900">
      <nav className="relative flex justify-between items-center px-3 py-2">
        <div>
          <NavLink to="/">
            <img
              src="/equb1.jpg"
              alt="logo"
              className="h-12 w-12 rounded-full"
            />
          </NavLink>
        </div>
        <div className={isOpen ? "flex" : " hidden sm:flex"}>
          <ul
            className="flex bg-white absolute sm:relative flex-col sm:flex-row sm:space-x-5 w-full shadow sm:shadow-none text-center top-14 left-0 sm:top-0 sm:flex"
            onClick={toggleNavbar}
          >
            {Links.map((link) => (
              <NavLink
                key={link.name}
                to={link.url}
                className="px-3 py-2 cursor-pointer rounded hover:bg-[#7da7a7] hover:text-white active:font-bold active:text-[#7da7a7] focus:text-[#7da7a7]"
              >
                {link.name}
              </NavLink>
            ))}
            <div
              className={
                isOpen
                  ? " flex justify-center items-center sm:hidden"
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
        <div className="hidden sm:flex">
          <button className="bg-[#008B8B] hover:bg-[#7da7a7] p-2 text-white rounded-lg w-24 h-8 flex justify-center items-center">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
        <div className="sm:hidden">
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
