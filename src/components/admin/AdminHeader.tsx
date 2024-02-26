import { RiMenuFill } from "react-icons/ri";
import AdminHeaderLink from "./AdminHeaderLink";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { menuBar } from "../../Redux/Features/userSlice";
import React from "react";
const AdminHeader = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <button
        onClick={() => {
          dispatch(menuBar());
        }}
        type="button"
        className="text-lg text-gray-900 font-semibold sidebar-toggle"
      >
        <RiMenuFill />
      </button>
      <AdminHeaderLink />
    </div>
  );
};

export default AdminHeader;
