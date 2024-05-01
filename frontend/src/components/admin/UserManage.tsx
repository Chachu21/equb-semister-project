import { useState, useEffect } from "react";
import axios from "axios";
import SearchUi from "../UI/SearchUi";
import Tables from "../UI/Tables";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { usersType } from "../../types/usersType";
import { toast } from "react-toastify";

interface UserData {
  address: string;
  name: string;
  phone: string;
  email: string;
  _id: string;
  city: string;
}

const UserManage = () => {
  const [tableData, setTableData] = useState<usersType[]>([]);
  const [filteredUser, setFilteredUser] = useState<UserData[]>([]);
  const userData = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<usersType[]>(
        "http://localhost:5000/api/v1/users"
      );
      setTableData(response.data.filter((res) => res.role === "user"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Extract only necessary fields from tableData
  const filteredData = tableData.map(
    ({ _id, name, email, phone, address, city }) => ({
      _id,
      name,
      email,
      phone,
      address,
      city,
    })
  );

  const handleSearch = (searchTerm: string) => {
    const filteredResults = filteredData.filter((data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUser(filteredResults);
  };

  const handleDelete = async (userId: string) => {
    try {
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `http://localhost:5000/api/v1/group/get/by/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const groupsData = response.data.group;
      if (groupsData && groupsData.status === "stated") {
        toast.warning("you can not delete a user");
      } else if (response.status === 404) {
        toast.warning("this action allowed for admin");
      } else {
        await axios.delete(
          `http://localhost:5000/api/v1/users/delete/${userId}`,
          config
        );
      }
      setTableData(tableData.filter((user) => user._id !== userId));
      setFilteredUser(filteredUser.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  // Other functions remain the same

  const tableHead = [
    { id: "1", title: "ID" },
    { id: "2", title: "Name" },
    { id: "3", title: "Email" },
    { id: "4", title: "PHONE" },
    { id: "5", title: "Address" },
    { id: "6", title: "City" },
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage users</h1>
      <div className="my-5">
        <SearchUi handleSearch={handleSearch} search={"name"} />
      </div>
      <Tables
        header={tableHead}
        datas={filteredUser.length > 0 ? filteredUser : filteredData}
        onDelete={handleDelete}
        hasDelete={true}
      />
    </div>
  );
};

export default UserManage;
