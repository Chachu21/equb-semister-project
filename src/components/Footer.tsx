
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Section: Organization Mark and Logo*/}
          <div className="mb-4 md:mb-0">
            <img
              src="equb1.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full mb-2" // Apply rounded-full class for circular shape
            />
            <p className="text-md">
              Empowering Communities
              <br />
              Through Mutual Financial Support
            </p>
          </div>

          {/* Middle Section: Navigation Links  */}

          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">More Links</h2>
            <ul>
              {/* Routes must be corrected */}
              <li className="mb-2">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="mb-2">
                <Link to={"/about"}>About</Link>
              </li>
              <li className="mb-2">
                <Link to={"/groups"}>Groups</Link>
              </li>
              <li className="mb-2">
                <Link to={"/contact"}>Contact</Link>
              </li>
              <li className="mb-2">
                <Link to={"/sevices"}>Services</Link>
              </li>
            </ul>
          </div>
          {/* Right Section: Social Media Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Reach Us</h2>
            <ul className="flex flex-col items-center p-2 gap-8">
              <li>
                {/* social media links must be corrected */}
                <Link to={"https://facebook.com"}>
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link to={"https://twitter.com"}>
                  <BsTwitterX />
                </Link>
              </li>
              <li>
                <Link to={"https://instagram.com"}>
                  <FaSquareInstagram />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-gray-400 pt-6 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Equb System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
