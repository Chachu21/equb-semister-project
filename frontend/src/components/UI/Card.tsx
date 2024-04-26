<<<<<<< .merge_file_3s5hXS
import { useState, useEffect } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> .merge_file_hfkuNg
import axios from "axios";
import { Link } from "react-router-dom";

const Card = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    completed: 0,
    pending: 0,
    started: 0,
  });

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/group/get`
        );
        const grp = response.data.searchResult.map(
          (group: { _id: string }) => group._id
        );

        setGroups(grp);
        const counts = {
          completed: response.data.searchResult.filter(
            (group: { status: string }) => group.status === "completed"
          ).length,
          pending: response.data.searchResult.filter(
            (group: { status: string }) => group.status === "pending"
          ).length,
          started: response.data.searchResult.filter(
            (group: { status: string }) => group.status === "started"
          ).length,
        };
        setStatusCounts(counts);
        console.log(groups);
      } catch (error) {
        console.error("Error fetching group status counts:", error);
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
          </div>
        </div>
        <Link
          to={`/admin/group-details?status=completed`}
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </Link>
      </div>
      <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
        <div className="flex justify-between mb-4">
          <div>
            <div className="flex items-center mb-1">
              <div className="text-2xl font-semibold">
                {statusCounts.pending}
              </div>
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
          </div>
        </div>
        <Link
          to={`/admin/group-details?status=pending`}
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </Link>
      </div>
      <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
        <div className="flex justify-between mb-6">
          <div>
            <div className="text-2xl font-semibold mb-1">
              {statusCounts.started}
            </div>
            <div className="text-md font-bold text-gray-400">started</div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <i className="ri-more-fill"></i>
            </button>
          </div>
        </div>
        <Link
          to={`/admin/group-details?status=unstarted`}
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Card;
