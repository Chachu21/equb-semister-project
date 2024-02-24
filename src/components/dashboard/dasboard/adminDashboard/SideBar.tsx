import {
  RiHome2Line,
  RiListCheck,
  RiMenuFill,
  RiUserLine,
} from "react-icons/ri";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import DashboardView from "./DashboardView";
import Card from "./UI/Card";
import React from "react";

const SideBar = () => {
  //for sidebar open and close hse global state
  const divRef = useRef<HTMLDivElement>(null);
  const divClose = useRef<HTMLDivElement>(null);
  const Buton = useRef<HTMLButtonElement>(null);

  const [isClicked, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isClicked);
  };
  const closeSidebar = () => {
    setIsActive(false);
    if (divRef.current) {
      divRef.current.classList.add("-translate-x-full");
    }
    if (divClose.current) {
      divClose.current.classList.add("hidden");
    }
    if (Buton.current) {
      Buton.current.classList.add("block");
    }
  };
  return (
    <div className="text-gray-800 font-inter">
      <div
        ref={divRef}
        className={`fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50
        ${isClicked ? "-translate-x-full" : ""}`}
      >
        <Link to="#" className="items-center pb-4 border-b border-b-gray-800">
          <h2 className="font-bold text-2xl">
            Equb
            <span className="bg-[#008B8B] text-white px-2 rounded-md">
              Admin
            </span>
          </h2>
        </Link>
        <ul className="mt-4">
          <span className="text-gray-400 font-bold">ADMIN</span>
          <li className="mb-1 group">
            <Link
              to=""
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <RiHome2Line className="mr-3 text-xl" />
              <span className="text-sm">Dashboard</span>
            </Link>
          </li>
          <li className="mb-1 group">
            <Link
              to=""
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 s"
            >
              <RiUserLine className="mr-3 text-xl" />
              <span className="text-sm">Manage Users</span>
              <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
            </Link>
          </li>
          <li className="mb-1 group">
            <Link
              to=""
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <RiListCheck className="mr-3 text-xl" />
              <span className="text-sm">Transactions</span>
            </Link>
          </li>

          <span className="text-gray-400 font-bold">Equb Groups</span>
          <li className="mb-1 group">
            <Link
              to=""
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
            >
              <RiListCheck className="mr-3 text-xl" />
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
          <li className="mb-1 group">
            <Link
              to=""
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <RiListCheck className="mr-3 text-xl" />
              <span className="text-sm">Notifications</span>
              <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">
                5
              </span>
            </Link>
          </li>
          <li className="mb-1 group">
            <Link
              to=""
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <RiListCheck className="mr-3 text-xl" />
              <span className="text-sm">Messages</span>
              <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">
                2 New
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div
        ref={divClose}
        onClick={closeSidebar}
        className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden ${
          isClicked ? "hidden" : ""
        }  `}
      ></div>

      <main
        className={`w-full md:ml-64 bg-gray-200 min-h-screen transition-all ${
          isClicked ? "md:ml-0" : "md:w-[calc(100%-256px)]"
        }`}
      >
        <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
          <button
            type="button"
            ref={Buton}
            onClick={toggleSidebar}
            className="text-lg text-gray-900 font-semibold sidebar-toggle"
          >
            <RiMenuFill />
          </button>
          <DashboardView />
        </div>

        <div className="p-6">
          <Card />
        </div>
      </main>
    </div>
  );
};

export default SideBar;
