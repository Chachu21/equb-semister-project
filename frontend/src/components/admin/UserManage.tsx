import { useState, useEffect } from "react";
import axios from "axios";
import SearchUi from "../UI/SearchUi";
import UserTables from "../UI/UserTables";

interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const UserManage = () => {
  const [tableData, setTableData] = useState<UserData[]>([]);
  const [filteredUser, setFilteredUser] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Fetch data from API using Axios when component mounts
    axios
      .get<UserData[]>("http://localhost:5000/api/v1/users")
      .then((response) => {
        setTableData(response.data); // Set table data from API response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run effect only once on mount

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = tableData.filter((data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUser(filteredResults);
  };

  const tableHead = [
    { id: "1", title: "User ID" },
    { id: "2", title: "Name" },
    { id: "3", title: "Email" },
    { id: "4", title: "CREATED DATE" },
    { id: "5", title: "UPDATED DATE" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage users</h1>
      <SearchUi handleSearch={handleSearch} search={"name"} />
      <UserTables
        header={tableHead}
        Users={filteredUser.length > 0 ? filteredUser : tableData}
      />
    </div>
  );
};

export default UserManage;
