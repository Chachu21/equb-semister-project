import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Group {
  _id: string;
  name: string;
  amount: number;
  types: string;
  member: number;
  status: string; // Add status property
}

const ViewGroupDetails: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const status = params.get("status");
  const [groups, setGroups] = useState<Group[]>([]);
console.log("status",status);

  useEffect(() => {
    const fetchGroupsAndFilterByStatus = async () => {
      try {
        const response = await axios.get<{ searchResult: Group[] }>(
          "http://localhost:5000/api/v1/group/get"
        );
        // Extract groups from response data
        const allGroups = response.data.searchResult;
        // Filter groups based on status
        const filteredGroups = allGroups.filter(
          (group) => group.status === status
        );
        setGroups(filteredGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    // Fetch groups and filter by status
    fetchGroupsAndFilterByStatus();
  }, [status]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Groups with Status: {status}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.length === 0 ? (
          <div className="text-center text-red-600">No groups found.</div>
        ) : (
          groups.map((group) => (
            <div key={group._id} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                <span className="font-semibold gap-4">Name:</span>
                {group.name}
              </h3>
              <p>
                <span className="font-semibold">Amount:</span> {group.amount}
              </p>
              <p>
                <span className="font-semibold">Types:</span> {group.types}
              </p>
              <p>
                <span className="font-semibold">Member count:</span>{" "}
                {group.member}
              </p>
              {/* Add more details as needed */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewGroupDetails;
