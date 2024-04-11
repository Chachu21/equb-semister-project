import React, { useState, useEffect } from "react";
import axios from "axios";
import Tables from "./Tables"; // Import the Tables component
interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const UserTables: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users");
      setUsers(response.data);
      console.log("Users fetched successfully");
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleEdit = (userId: string) => {
    console.log("Editing user with ID:", userId);
    setEditingUserId(userId);
    setEditedUser(users.find((user) => user._id === userId) || null);
  };

  const handleSaveEdit = async (userId: string) => {
    if (editedUser && userId) {
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
    } else {
      console.error("Invalid user data:", editedUser);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (editedUser) {
  //     setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  //   }
  // };
  const handleDelete = async (userId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
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
    </div>
  );
};

export default UserTables;
