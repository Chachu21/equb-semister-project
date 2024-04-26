<<<<<<< .merge_file_e2Q1AV
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tables from "./Tables"; // Import the Tables component
=======
import React, { useState } from "react";

interface Header {
  id: string;
  title: string;
}

>>>>>>> .merge_file_3vD3Nu
interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

<<<<<<< .merge_file_e2Q1AV
const UserTables: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);
=======
interface TableProps {
  header: Header[];
  users: UserData[];
  onEdit: (userId: string, updatedUser: UserData) => void;
  onDelete: (userId: string) => void;
  onSaveEdit: (userId: string, updatedUser: UserData) => void;
}

const UserTables: React.FC<TableProps> = ({
  header,
  users,
  onEdit,
  onDelete,
  onSaveEdit,
}) => {
  //set current page is by default 1
  const [currentPage, setCurrentPage] = useState<number>(1);
  //set nubber of table list in single page is 6
  const [itemsPerPage] = useState<number>(5);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);

  //format string to change date value to approprate string format
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
>>>>>>> .merge_file_3vD3Nu

  // logic for paginations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

<<<<<<< .merge_file_e2Q1AV
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
=======
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
>>>>>>> .merge_file_3vD3Nu

  const handleEdit = (userId: string) => {
    console.log("Editing user with ID:", userId);
    setEditingUserId(userId);
    setEditedUser(users.find((user) => user._id === userId) || null);
  };

  const handleSaveEdit = async (userId: string) => {
    if (editedUser && userId) {
<<<<<<< .merge_file_e2Q1AV
      try {
        const response = await axios.put(
          `http://localhost:5000/api/v1/users/update/${userId}`,
          editedUser
        );
        console.log("User updated successfully:", response.data);
        setEditingUserId(null);
        setEditedUser(null);
        fetchUsers(); // Fetch the updated user list after saving edit
      } catch (error) {
        console.error("Failed to update user:", error);
      }
=======
      onSaveEdit(userId, editedUser);
      setEditingUserId(null);
      setEditedUser(null);
>>>>>>> .merge_file_3vD3Nu
    } else {
      console.error("Invalid user data:", editedUser);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };

<<<<<<< .merge_file_e2Q1AV
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (editedUser) {
  //     setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  //   }
  // };
=======
>>>>>>> .merge_file_3vD3Nu
  const handleDelete = async (userId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
<<<<<<< .merge_file_e2Q1AV
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/v1/users/delete/${userId}`
        );
        console.log("User deleted successfully:", response.data);
        fetchUsers(); // Fetch the updated user list after deletion
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const headers = {
    _id: "ID",
    name: "Name",
    email: "Email",
    createdAt: "Created At",
    updatedAt: "Updated At",
    actions: "Actions", // Added actions column header
  };

  return (
    <div>
      <Tables
        header={headers}
        data={users.map((user) => ({
          ...user,
          createdAt: formatDateString(user.createdAt),
          updatedAt: formatDateString(user.updatedAt),
          actions:
            editingUserId === user._id ? (
              <>
                <button
                  onClick={() => handleSaveEdit(user._id)}
                  className="text-green-600 hover:text-green-900 pr-1"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(user._id)}
                  className="text-indigo-600 hover:text-indigo-900 pr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </>
            ),
        }))}
      />
=======
      onDelete(userId);
    }
  };

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((data) => (
            <tr key={data._id}>
              <td className="px-6 py-4 whitespace-nowrap">{data._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === data._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser?.name || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                ) : (
                  data.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === data._id ? (
                  <input
                    type="text"
                    name="email"
                    value={editedUser?.email || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                ) : (
                  data.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDateString(data.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDateString(data.updatedAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                {editingUserId === data._id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(data._id)}
                      className="text-green-600 hover:text-green-900 pr-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(data._id)}
                      className="text-indigo-600 hover:text-indigo-900 pr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="text-red-600 hover:text-red-900"
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
      {/* pagination navs */}
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
       
        <span
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

         >
          Showing{" "}
          <span className="font-semibold p-1 text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {indexOfFirstItem + 1}
          </span>
          -
          <span className="font-semibold p-1  text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {Math.min(indexOfLastItem, users.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold p-1  text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {users.length}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
            (item, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    index + 1 === currentPage ? "text-blue-600 bg-blue-50" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
>>>>>>> .merge_file_3vD3Nu
    </div>
  );
};

export default UserTables;

