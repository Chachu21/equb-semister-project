import { useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { logoutSuccess, menuBar } from "../../../Redux/Features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const UserHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [Profile, setProfile] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-10 items-center">
          <button
            onClick={() => {
              dispatch(menuBar());
            }}
            type="button"
            className="text-lg text-gray-900 font-semibold "
          >
            <RiMenuFill />
          </button>
          <span>Dashboard</span>
        </div>
        <ul>
          <li className="ml-3">
            <button
              onClick={() => {
                setProfile(!Profile);
              }}
              type="button"
              className="flex items-center"
            >
              <div className="flex-shrink-0 w-10 h-10 relative">
                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                    alt=""
                  />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                </div>
              </div>
              <div className="p-2 md:block text-left">
                <h2 className="text-sm font-semibold text-gray-800">
                  John Doe
                </h2>
                <p className="text-xs text-gray-500">User</p>
              </div>
            </button>
            <ul
              className={`shadow-md shadow-black/5 z-30 ${
                Profile
                  ? "flex flex-col fixed top-[70px] right-[10px] space-y-2"
                  : "hidden"
              } py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]`}
            >
              <li>
                <Link
                  onClick={() => {
                    setProfile(!Profile);
                  }}
                  to="/admin/profile"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-gray-500 hover:bg-gray-50"
                >
                  Profile
                </Link>
              </li>
              <li>
                <form method="POST" action="" onClick={logoutHandler}>
                  <Link
                    onClick={() => {
                      setProfile(!Profile);
                    }}
                    to="/"
                    role="menuitem"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                  >
                    Log Out
                  </Link>
                </form>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserHeader;
