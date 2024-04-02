import {
  RiHome2Line,
  RiUserLine,
  RiExchangeDollarFill,
  RiGroupLine,
  RiNotification4Line,
  RiMessage2Line,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/store";
import { menuBar } from "../../Redux/Features/userSlice";

const AdminSideBar = () => {
  const isClicked = useSelector((state: RootState) => state.user.isClicked);
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseSideBar = () => {
    console.log(isClicked);

    dispatch(menuBar());
    console.log(isClicked);
  };

  return (
    <aside
      className={`fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 transform ${
        isClicked ? "-translate-x-full" : "translate-x-0"
      } `}
    >
      <Link
        to="/admin"
        className="items-center pb-4 border-b border-b-gray-800"
      >
        <h2 className="font-bold text-2xl">
          Equb
          <span className="bg-[#008B8B] text-white px-2 rounded-md">Admin</span>
        </h2>
      </Link>
      <ul className="mt-4">
        <span className="text-gray-400 font-bold">ADMIN</span>
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="/admin"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <RiHome2Line className="mr-3 text-xl" />
            <span className="text-sm">Dashboard</span>
          </Link>
        </li>
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="manageuser"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 s"
          >
            <RiUserLine className="mr-3 text-xl" />
            <span className="text-sm">Manage Users</span>
            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
          </Link>
        </li>
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="transactions"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <RiExchangeDollarFill className="mr-3 text-xl" />
            <span className="text-sm">Transactions</span>
          </Link>
        </li>
        <span className="text-gray-400 font-bold">Equb Groups</span>
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="/admin/createGroup"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
          >
            <RiGroupLine className="mr-3 text-xl" />
            <span className="text-sm">Manage Groups</span>
            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
          </Link>
          <ul className="pl-7 mt-2 hidden group-[.selected]:block">
            <li className="mb-4">
              <Link
                to=""
                className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              >
                All
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to=""
                className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              >
                Categories
              </Link>
            </li>
          </ul>
        </li>
        <span className="text-gray-400 font-bold">PERSONAL</span>
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="managegroups"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <RiNotification4Line className="mr-3 text-xl" />
            <span className="text-sm">Notifications</span>
            <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">
              5
            </span>
          </Link>
        </li>
        {/* ///////////////// */}
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="grouphistory"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <RiNotification4Line className="mr-3 text-xl" />
            <span className="text-sm">usergroupdetail</span>
            <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">
              5
            </span>
          </Link>
        </li>
        {/* ///////////////// */}
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="accountdetail"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <RiNotification4Line className="mr-3 text-xl" />
            <span className="text-sm">Account Detail</span>
            <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">
              5
            </span>
          </Link>
        </li>
        {/* ///////////////// */}
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="pay"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <RiNotification4Line className="mr-3 text-xl" />
            <span className="text-sm">Pay</span>
            <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">
              5
            </span>
          </Link>
        </li>
        {/* ///////////////// */}
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="profile"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <RiNotification4Line className="mr-3 text-xl" />
            <span className="text-sm">Profile</span>
          </Link>
        </li>
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            to="/admin/payment"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <RiMessage2Line className="mr-3 text-xl" />
            <span className="text-sm">Messages</span>
            <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">
              2 New
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideBar;
