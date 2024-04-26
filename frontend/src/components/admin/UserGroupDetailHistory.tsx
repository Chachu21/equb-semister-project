import React, { useState, useEffect } from "react";
import SearchUi from "../UI/SearchUi";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Tables from "../UI/Tables";

interface Header {
  id: string;
  title: string;
}

interface datas {
  _id: string;
  status: string;
  name: string;
  types: string;
  
  winners: string;
  createdAt: string;
  updatedAT: string;
  member: string;
  amount: string;
  isCompleted: boolean;
}

//TODO

//STARTEDDATE
//COMPLETEDDATE both should be calculated soon
const UserGroupDetailHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUserGroup, setFilteredUsergroup] = useState<datas[]>([]);
  const [userGroups, setUserGroups] = useState<datas[]>([]);
  const userData: any = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const userId = userData?._id; // Replace with the actual user ID
        const response = await axios.get<datas[]>(
          `http://localhost:5000/api/v1/group/userJoinedGroups/${userId}`
        );
        setUserGroups(response.data);
  //TODO
// //find startdate
// const data=response.data;
// console.log("datas are");


        console.log("groupInfor", response.data);

        console.log("response", response);
      } catch (error) {
        console.error("Error fetching user's joined groups:", error);
      }
    };

    fetchUserGroups();
  }, []);

  // Extract only necessary fields from tableData
  const filteredData = userGroups.map(
    ({
      _id,
      name,
      member,
    
      winners,
      amount,
      status,
      isCompleted,
    }) => ({
      _id,
      status,
      name,
      
      winners,
      amount,
       member,
      isCompleted,
    })
  );

  const header: Header[] = [
    { id: "1", title: "GroupId" },
    { id: "2", title: "Status" },
    { id: "3", title: "GroupName" },
  
    { id: "5", title: "winners" },
    { id: "6", title: "amount" },
    { id: "7", title: "GroupSize" },
    { id: "8", title: "iscompleted" },
  ];
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = filteredData.filter((data) =>
      data.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsergroup(filteredResults);
  };

 
const handleDelete = async (groupId: string) => {
  try {
     const token = userData?.token;
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
     };
    https: console.log("groupId is :", groupId);
    await axios.delete(`http://localhost:5000/api/v1/group/${groupId}`,config);
    setUserGroups(userGroups.filter((group) => group._id !== groupId));
    setFilteredUsergroup(
      filteredUserGroup.filter((group) => group._id !== groupId)
    );
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">
        UserGroupDetailHistory
      </h1>
      <SearchUi handleSearch={handleSearch} search={"status"} />
      <Tables
        header={header}
        datas={filteredUserGroup.length > 0 ? filteredUserGroup : filteredData}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserGroupDetailHistory;
