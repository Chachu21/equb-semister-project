import { useState } from "react";
import SearchUi from "../UI/SearchUi";
import UserTables from "../UI/UserTables";

const UserManage = () => {
  //

  const tableData = [
    {
      id: "1",
      fullName: "muller",
      email: "john.doe@example.com",
      role: "user",
      registrationDate: "2023-01-15",
      lastLoginDate: "2023-02-20",
    },
    {
      id: "2",
      fullName: "chale",
      email: "jane.smith@example.com",
      role: "User",
      registrationDate: "2023-02-10",
      lastLoginDate: "2023-02-22",
    },
    {
      id: "3",
      fullName: "jane_smith",
      email: "jane.smith@example.com",
      role: "User",
      registrationDate: "2023-02-10",
      lastLoginDate: "2023-02-22",
    },
    {
      id: "4",
      fullName: "jane_smith",
      email: "jane.smith@example.com",
      role: "User",
      registrationDate: "2023-02-10",
      lastLoginDate: "2023-02-22",
    },
    {
      id: "5",
      fullName: "jane_smith",
      email: "jane.smith@example.com",
      role: "User",
      registrationDate: "2023-02-10",
      lastLoginDate: "2023-02-22",
    },
    {
      id: "6",
      fullName: "jane_smith",
      email: "jane.smith@example.com",
      role: "User",
      registrationDate: "2023-02-10",
      lastLoginDate: "2023-02-22",
    },
    {
      id: "7",
      fullName: "jane_smith",
      email: "jane.smith@example.com",
      role: "User",
      registrationDate: "2023-02-10",
      lastLoginDate: "2023-02-22",
    },
    {
      id: "8",
      fullName: "jane_smith",
      email: "jane.smith@example.com",
      role: "User",
      registrationDate: "2023-02-10",
      lastLoginDate: "2023-02-22",
    },
    {
      id: "9",
      fullName: "jane_smith",
      email: "jane.smith@example.com",
      role: "User",
      registrationDate: "2023-02-10",
      lastLoginDate: "2023-02-22",
    },
    // Add more user objects as needed
  ];

  // Table header
  const tableHead = [
    { id: "1", title: "User ID" },
    { id: "2", title: "fullName" },
    { id: "3", title: "Email" },
    { id: "4", title: "Role" },
    { id: "5", title: "Registration Date" },
    { id: "6", title: "Last Login Date" },
  ];
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUser, setFilteredUser] = useState([]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults: any = tableData.filter((data) =>
      data.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUser(filteredResults);
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage users</h1>
      <SearchUi handleSearch={handleSearch} search={"fullName"} />
      <UserTables
        header={tableHead}
        Users={filteredUser.length > 0 ? filteredUser : tableData}
      />
    </div>
  );
};

export default UserManage;
