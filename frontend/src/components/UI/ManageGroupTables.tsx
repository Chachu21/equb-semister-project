import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface Header {
  id: string;
  title: string;
}

<<<<<<< .merge_file_iGofpo
interface equbGroups {
  id: string;
  period: string;
  groupName: string;
=======
interface EqubGroup {
  _id: string;
  types: string;
  name: string;
>>>>>>> .merge_file_Fz5RDs
  members: number;
  amount: number;
  status: string;
}

interface TableProps {
  header: Header[];
  equbGroups: EqubGroup[];
  onGroupDeleted: (groupId: string) => void; // Handler for group deletion
}

<<<<<<< .merge_file_iGofpo
const ManageGroupTables: React.FC<TableProps> = ({ header, equbGroups }) => {
  //TODO  will implement the approve and reject button is clicked then status will change
=======
const ManageGroupTables: React.FC<TableProps> = ({
  header,
  equbGroups,
  onGroupDeleted,
}) => {
  const userData: any = useSelector((state: RootState) => state.user.user);
  const [showModal, setShowModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);

  const handleDelete = async (groupId: string) => {
    setGroupToDelete(groupId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.delete(
        `http://localhost:5000/api/v1/group/${groupToDelete}`,
        config
      );
      // If successful, call the parent component handler to update the state
      onGroupDeleted(groupToDelete!);
      console.log("Group deleted successfully");
    } catch (error) {
      console.error("Error deleting group:", error);
    } finally {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setGroupToDelete(null);
  };

>>>>>>> .merge_file_Fz5RDs
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {header.map((item) => (
              <th
                key={item.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equbGroups.map((group) => (
            <tr key={group._id}>
              <td className="px-6 py-4 whitespace-nowrap">{group._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{group.types}</td>
              <td className="px-6 py-4 whitespace-nowrap">{group.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{group.members}</td>
              <td className="px-6 py-4 whitespace-nowrap">${group.amount}</td>
              <td
                className={`px-6 py-4 whitespace-nowrap ${
                  group.status === "Approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {group.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {group.status === "pending" && (
                  <>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(group._id)} // Attach onClick event to call handleDelete function
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-50 bg-[rgba(0,0,0,0.5)] overflow-auto font-sans">
          <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 cursor-pointer fill-black hover:fill-red-500 absolute top-3 right-3"
              viewBox="0 0 320.591 320.591"
              onClick={closeModal}
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
            <div className="my-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 fill-red-500 inline"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                  data-original="#000000"
                />
                <path
                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                  data-original="#000000"
                />
              </svg>
              <h4 className="text-xl font-semibold mt-6">
                Are you sure you want to delete it?
              </h4>
              <p className="text-sm text-gray-500 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                auctor auctor arcu, at fermentum dui. Maecenas
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGroupTables;
