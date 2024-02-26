import React from "react";

interface Header {
  id: string;
  title: string;
}

interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  registrationDate: string;
  lastLoginDate: string;
}

interface TableProps {
  header: Header[];
  Users: UserData[];
}

const UserTables: React.FC<TableProps> = ({ header, Users }) => {
  //TODO
  const handleEdit = () => {
    console.log("editting the user in actions");
  };
  //TODO
  const handleDelete = () => {
    console.log("deleting the user in actions");
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
          {Users.map((data) => (
            <tr key={data.id}>
              <td className="px-6 py-4 whitespace-nowrap">{data.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.registrationDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.lastLoginDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                {/* Action buttons */}
                <button
                  onClick={handleEdit}
                  className="text-indigo-600 hover:text-indigo-900 pr-1"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-900 "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTables;
