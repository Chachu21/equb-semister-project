import { useState, useEffect } from "react";
import axios from "axios";

const Card = () => {
  const [statusCounts, setStatusCounts] = useState({
    completed: 0,
    pending: 0,
    unstarted: 0,
  });

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/v1/groups/equbStatusCounts`
        );
        setStatusCounts(response.data);
      } catch (error) {
        console.error("Error fetching equb status counts:", error);
      }
    };

    fetchStatusCounts();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
        <div className="flex justify-between mb-6">
          <div>
            <div className="flex items-center mb-1">
              <div className="text-2xl font-semibold">
                {statusCounts.completed}
              </div>
            </div>
            <div className="text-md font-bold text-gray-400">Completed</div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <i className="ri-more-fill"></i>
            </button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <a
          href="/gebruikers"
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </a>
      </div>
      <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
        <div className="flex justify-between mb-4">
          <div>
            <div className="flex items-center mb-1">
              <div className="text-2xl font-semibold">
                {statusCounts.pending}
              </div>
              {/* <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                +30%
              </div> */}
            </div>
            <div className="text-md font-bold text-gray-400">Pending</div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <i className="ri-more-fill"></i>
            </button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a
          href="/dierenartsen"
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </a>
      </div>
      <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
        <div className="flex justify-between mb-6">
          <div>
            <div className="text-2xl font-semibold mb-1">
              {statusCounts.unstarted}
            </div>
            <div className="text-md font-bold text-gray-400">Unstarted</div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <i className="ri-more-fill"></i>
            </button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a
          href=""
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </a>
      </div>
    </div>
  );
};

export default Card;
