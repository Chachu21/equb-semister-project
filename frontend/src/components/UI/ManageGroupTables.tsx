import React from "react";

interface Header {
  id: string;
  title: string;
}

interface equbGroups {
  id: string;
  types: string;
  name: string;
  members: number;
  amount: number;
  status: string;
}

interface TableProps {
  header: Header[];
  equbGroups: equbGroups[];
}

const ManageGroupTables: React.FC<TableProps> = ({ header, equbGroups }) => {
  //TODO  will implement the approve and reject button is clicked then status will change
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
            <tr key={group.id}>
              <td className="px-6 py-4 whitespace-nowrap">{group.id}</td>
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
                {group.status === "Pending" && (
                  <>
                    <button className="text-green-600 hover:text-green-900 mr-2">
                      Approve
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Reject
                    </button>
                  </>
                )}
                {group.status === "Approved" && (
                  <>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
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

export default ManageGroupTables;
