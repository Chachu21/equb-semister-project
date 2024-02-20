import { useState } from "react";
import { Link } from "react-router-dom";

const Links = [
  {name:"Home", url:"/"},
  {name:"Group",url:'/group'},
  { name: "About", url:'/about'},
 
  
];

const listItems = Links.map((link) => (
  <li key={link.name} className="px-3 py-2 cursor-pointer rounded hover:bg-sky-100">
    <Link to={link.url}> {link.name}</Link>
  </li>
));

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="">
      <nav className="relative m-auto sm:mx-[50px] z-10 flex justify-between items-center  my-4 px-3 py-2">
        <div>
          <Link to="/">
            <img
              src="/equb1.jpg"
              alt="logo"
              className="h-12 w-12 rounded-full"
            />
          </Link>
        </div>
        <div className={isOpen ? "flex" : " hidden sm:flex"}>
          <ul className="flex bg-white absolute sm:relative flex-col sm:flex-row w-full shadow sm:shadow-none text-center top-14 left-0 sm:top-0 sm:flex">
            {listItems}
            <div
              className={
                isOpen
                  ? " flex justify-center items-center sm:hidden"
                  : "hidden"
              }
            >
              <button className="bg-[#008B8B] hover:bg-[#7da7a7]  p-2 text-white rounded-lg w-24 h-8 flex justify-center items-center">
               <Link to='/login'> Sign In</Link>
              </button>
            </div>
          </ul>
        </div>
        <div className="hidden sm:flex">
          <button className="bg-[#008B8B] hover:bg-[#7da7a7] p-2 text-white rounded-lg w-24 h-8 flex justify-center items-center">
           <Link to='/login'> Sign In</Link>
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
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
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
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
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
}
export default Navbar;