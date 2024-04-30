import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RequestCard = () => {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/request/get"
        );
        setRequestCount(response.data.length);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
        <div className="flex justify-between mb-6">
          <div>
            <div className="flex items-center mb-1">
              <div className="text-2xl font-semibold">{requestCount}</div>
            </div>
            <div className="text-md font-bold text-gray-400">Requests</div>
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
          to={"/equbCreatorDashboard/eeqrsstu"}
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default RequestCard;
