import React, { useState, useEffect } from "react";
import axios from "axios";

interface Header {
  id: string;
  title: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface TableProps {
  header: Header[];
  Users: UserData[];
}

const UserTables: React.FC<TableProps> = ({ header, Users }) => {
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<UserData[]>([]); // State to store the updated user list

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users");
      setUsers(response.data);
      console.log("Users fetched successfully");
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const handleEdit = (userId: string) => {
    setEditingUserId(userId);
    setEditedUser(users.find((user) => user._id === userId) || null);
    console.log("Editing user with ID:", userId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  const handleSaveEdit = async (userId: string) => {
    if (editedUser && userId) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/v1/users/${userId}`,
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
 const handleDelete = async (userId: string) => {
   const isConfirmed = window.confirm(
     "Are you sure you want to delete this user?"
   );
   if (isConfirmed) {
     setDeletingUserId(userId);
     try {
       const response = await axios.delete(
         `http://localhost:5000/api/v1/users/${userId}`
       );
       console.log("User deleted successfully:", response.data);
       fetchUsers(); // Fetch the updated user list after deletion
     } catch (error) {
       console.error("Failed to delete user:", error);
     }
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
           {users.map((data) => (
             <tr key={data._id}>
               <td className="px-6 py-4 whitespace-nowrap">{data._id}</td>
               <td className="px-6 py-4 whitespace-nowrap">
                 {editingUserId === data._id ? (
                   <input
                     type="text"
                     name="name"
                     value={editedUser?.name || ""}
                     onChange={handleInputChange}
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
     </div>
   );
};

export default UserTables;
