
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Card = () => {
//   const [groups, setGroups] = useState<string[]>([]);
//   const [statusCounts, setStatusCounts] = useState({
//     completed: 0,
//     pending: 0,
//     unstarted: 0,
//   });

//   useEffect(() => {
//     const fetchStatusCounts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/v1/group/get`
//         );
//         // Extract group IDs from the response data
//         const grp = response.data.searchResult.map(
//           (group: { _id: string }) => group._id
//         );

//         setGroups(grp);
//         // Calculate status counts from the response data
//         const counts = {
//           completed: response.data.searchResult.filter(
//             (group: { status: string }) => group.status === "completed"
//           ).length,
//           pending: response.data.searchResult.filter(
//             (group: { status: string }) => group.status === "pending"
//           ).length,
//           unstarted: response.data.searchResult.filter(
//             (group: { status: string }) => group.status === "unstarted"
//           ).length,
//         };
//         setStatusCounts(counts);
//       } catch (error) {
//         console.error("Error fetching group status counts:", error);
//       }
//     };

//     fetchStatusCounts();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//       <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
//         <div className="flex justify-between mb-6">
//           <div>
//             <div className="flex items-center mb-1">
//               <div className="text-2xl font-semibold">
//                 {statusCounts.completed}
//               </div>
//             </div>
//             <div className="text-md font-bold text-gray-400">Completed</div>
//           </div>
//           <div className="dropdown">
//             <button
//               type="button"
//               className="dropdown-toggle text-gray-400 hover:text-gray-600"
//             >
//               <i className="ri-more-fill"></i>
//             </button>
//             {/* Dropdown menu */}
//           </div>
//         </div>
//         {/* Use Link to navigate to the group details page with the group ID */}
//         <Link
//           to={`/admin/group-details/${groups[0]}`} // Pass the first group ID
//           className="text-[#f84525] font-medium text-sm hover:text-red-800"
//         >
//           View
//         </Link>
//       </div>
//       <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
//         <div className="flex justify-between mb-4">
//           <div>
//             <div className="flex items-center mb-1">
//               <div className="text-2xl font-semibold">
//                 {statusCounts.pending}
//               </div>
//             </div>
//             <div className="text-md font-bold text-gray-400">Pending</div>
//           </div>
//           <div className="dropdown">
//             <button
//               type="button"
//               className="dropdown-toggle text-gray-400 hover:text-gray-600"
//             >
//               <i className="ri-more-fill"></i>
//             </button>
//             {/* Dropdown menu */}
//           </div>
//         </div>
//         {/* Use Link to navigate to the group details page with the group ID */}
//         <Link
//           to={`/admin/group-details/${groups[1]}`} // Pass the second group ID
//           className="text-[#f84525] font-medium text-sm hover:text-red-800"
//         >
//           View
//         </Link>
//       </div>
//       <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
//         <div className="flex justify-between mb-6">
//           <div>
//             <div className="text-2xl font-semibold mb-1">
//               {statusCounts.unstarted}
//             </div>
//             <div className="text-md font-bold text-gray-400">Unstarted</div>
//           </div>
//           <div className="dropdown">
//             <button
//               type="button"
//               className="dropdown-toggle text-gray-400 hover:text-gray-600"
//             >
//               <i className="ri-more-fill"></i>
//             </button>
//             {/* Dropdown menu */}
//           </div>
//         </div>
//         {/* Use Link to navigate to the group details page with the group ID */}
//         <Link
//           to={`/admin/group-details/${groups[2]}`} // Pass the third group ID
//           className="text-[#f84525] font-medium text-sm hover:text-red-800"
//         >
//           View
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    completed: 0,
    pending: 0,
    unstarted: 0,
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
          unstarted: response.data.searchResult.filter(
            (group: { status: string }) => group.status === "unstarted"
          ).length,
        };
        setStatusCounts(counts);
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
