import {
  RiDashboard2Line,
  RiSettings3Line,
  // RiSecurePaymentFill,
  RiCloseFill,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/store";
import { menuBar } from "../../Redux/Features/userSlice";
import { FaUserGroup } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
// import lucky from "../../../public/lucky.png";

const LinkComponent = [
  {
    id: 1,
    name: "Dashboard",
    path: "/userDashboard",
    icon: <RiDashboard2Line className="mr-3 text-xl" />,
  },

  {
    id: 2,
    name: "Groups",
    path: "/userDashboard/groups",
    icon: <FaUserGroup className="mr-3 text-xl" />,
  },
  {
    id: 3,
    name: "Transactions",
    path: "/userDashboard/transactions",
    icon: <GrTransaction className="mr-3 text-xl" />,
  },
  // {
  //   id: 4,
  //   name: "payment",
  //   path: "/userDashboard/payment",
  //   icon: <RiSecurePaymentFill className="mr-3 text-xl" />,
  // },
  {
    id: 5,
    name: "Account details",
    path: "/userDashboard/setting",
    icon: <RiSettings3Line className="mr-3 text-xl" />,
  },
  {
    id: 7,
    name: "sendRequest",
    path: "/userDashboard/userRequest",
    icon: <RiSettings3Line className="mr-3 text-xl" />,
  },
];

const UserSideBar = () => {
  const isClicked = useSelector((state: RootState) => state.user.isClicked);
  const dispatch = useDispatch<AppDispatch>();

  const screenWidth = window.innerWidth;

  const handleCloseSideBar = () => {
    if (screenWidth < 640) {
      dispatch(menuBar());
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 transform ${
        isClicked ? "-translate-x-full" : "translate-x-0"
      } `}
    >
      <div className="flex justify-between items-center">
        <Link
          to="/userDashboard"
          className="items-center pb-4 border-b border-b-gray-800"
        >
          <h2 className="font-bold text-2xl">
            Equb
            <span className="bg-[#008B8B] text-white px-2 rounded-md">
              user
            </span>
          </h2>
        </Link>
        <button
          type="button"
          onClick={() => dispatch(menuBar())}
          className="md:hidden block w-fit bg-white p-1 text-gray-900 text-2xl font-semibold"
        >
          <RiCloseFill />
        </button>
      </div>

      <ul className="mt-4 space-y-5">
        <span className="text-gray-400 font-bold">manage your account</span>

        {LinkComponent.map((links) => (
          <li
            key={links.id}
            className="mb-1 group"
            onClick={handleCloseSideBar}
          >
            <Link
              to={links.path}
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              {links.icon}
              <span className="text-sm">{links.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSideBar;
