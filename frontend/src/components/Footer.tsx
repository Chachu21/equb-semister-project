import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
const Footer = () => {
  const Links = [
    {
      id: 1,
      name: "home",
      url: "/",
    },
    {
      id: 2,
      name: "about",
      url: "/about",
    },
    {
      id: 3,
      name: "groups",
      url: "/group",
    },
    // {
    //   id: 4,
    //   name: "service",
    //   url: "/service",
    // },
  ];

  const Icons = [
    {
      id: 1,
      url: "https://facebook.com",
      icon: <FaFacebook size={22} />,
    },
    {
      id: 1,
      url: "https://twitter.com",
      icon: <BsTwitterX size={22} />,
    },
    {
      id: 3,
      url: "https://instagram.com",
      icon: <FaSquareInstagram size={22} />,
    },
  ];

  return (
    <footer className="bg-gray-700 text-white dark:bg-gray-900 dark:text-white py-8 shadow-sm w-full">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row justify-evenly">
          {/* Left Section: Organization Mark and Logo*/}
          <div className="mb-4 md:mb-0  flex flex-col space-y-3 dark:text-white">
            {/* <img
              src="equb1.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full mb-2" // Apply rounded-full class for circular shape
            /> */}
            <NavLink
              to="/"
              className="font-pacifico flex space-x-2 text-[#008B8B] underline"
            >
              <h1 className="font-medium text-3xl">Equb</h1>
              <span className="text-2xl">|</span>
              <p className="font-medium text-2xl">እቁብ</p>
            </NavLink>
            <p className="text-lg">
              Empowering Communities
              <br />
              Through Mutual Financial Support
            </p>
          </div>

          <div className="flex justify-between md:space-x-80 space-x-0 dark:text-white">
            {/* Middle Section: Navigation Links  */}

            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-medium mb-4">More Links</h2>
              <ul className="text-lg dark:text-white">
                {/* Routes must be corrected */}
                {Links.map((link) => (
                  <li key={link.id} className="mb-2 hover:text-[#008B8B]">
                    <Link to={link.url} className="uppercase">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Section: Social Media Links */}
            <div>
              <h2 className="text-xl font-medium mb-4">Reach Us</h2>
              <ul className="flex flex-col items-center p-2 gap-4">
                {Icons.map((icon, index) => (
                  <li key={index}>
                    {/* social media links must be corrected */}
                    <Link to={icon.url} className="hover:text-[#008B8B]">
                      {icon.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-gray-400 pt-5 text-lg font-medium text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Equb System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
