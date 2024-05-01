import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { menuBar } from "../../Redux/Features/userSlice";
import { FaUserGroup } from "react-icons/fa6";
// import { RiDashboard2Line, RiCloseFill } from "react-icons/ri";
import { FaQuestionCircle } from "react-icons/fa";
import { RootState, AppDispatch } from "../../Redux/store";
import { resetCount } from "../../Redux/Features/requestSlice";
import { RiCloseFill } from "react-icons/ri";

const LinkComponent = [
  {
    id: 1,
    name: "Manage groups",
    path: "/equbCreatorDashboard/manageGroups",
    icon: <FaUserGroup className="mr-3 text-xl" />,
  },
  // {
  //   id: 1,
  //   name: "Dashboard",
  //   path: "/equbCreatorDashboard",
  //   icon: <RiDashboard2Line className="mr-3 text-xl" />,
  // },
  {
    id: 2,
    name: "manage requests",
    path: "/equbCreatorDashboard/requests",
    icon: <FaQuestionCircle className="mr-3 text-xl" />,
  },

  // {
  //   id: 5,
  //   name: "Settings",
  //   path: "/equbCreatorDashboard/setting",
  //   icon: <RiSettings3Line className="mr-3 text-xl" />,
  // },
];

const EqubCreatorSideBar = () => {
  const [viewedNewRequests, setViewedNewRequests] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const isClicked = useSelector((state: RootState) => state.user.isClicked);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/request/get"
        );
        const count = response.data.length;
        if (!viewedNewRequests) {
          setRequestCount(count);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, [viewedNewRequests]);

  const handleRequestsClick = () => {
    setViewedNewRequests(true);
    dispatch(resetCount());
  };

  const screenWidth = window.innerWidth;

  const handleCloseSideBar = () => {
    if (screenWidth < 640) {
      dispatch(menuBar());
    }
  };

  return (
    <aside>
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 transform ${
          isClicked ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center">
          <Link
            to="/admin"
            className="items-center pb-4 border-b border-b-gray-800"
          >
            <h2 className="font-bold text-2xl">
              Equb
              <span className="bg-[#008B8B] text-white px-2 rounded-md">
                creator
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
                onClick={
                  links.name === "Requests" ? handleRequestsClick : undefined
                }
              >
                {links.icon}
                <span className="text-sm">{links.name}</span>
                {links.name === "Requests" && requestCount > 0 && (
                  <span className="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">
                    {requestCount} New
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default EqubCreatorSideBar;
