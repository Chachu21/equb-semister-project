import { useState, useEffect } from "react";
import axios from "axios";
import ManageGroupTables from "../UI/ManageGroupTables";
import SearchUi from "../UI/SearchUi";
import Tables from "../UI/Tables";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface EqubGroup {
  _id: string;
  types: string;
  name: string;
  member: number;
  amount: number;
  status: string;
}

const ManageGroups = () => {
  const [equbGroups, setEqubGroups] = useState<EqubGroup[]>([]);
  const [filteredGroup, setFilteredGroup] = useState<EqubGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const userData: any = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/group");
      setEqubGroups(response.data);
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk",response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


 // Extract only necessary fields from tableData
 const filteredData = equbGroups.map(
   ({ _id,
   types,
   name,
   member,
   amount,
   status }) => ({
   _id,
   types,
   name,
   member,
   amount,
   status
   })
 );

  const tableHead = [
    { id: "1", title: "ID" },
    { id: "2", title: "Types" },
    { id: "3", title: "GroupName" },
    { id: "4", title: "Member" },
    { id: "5", title: "Amount" },
    { id: "6", title: "Status" },
  ];

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = filteredData.filter((data) =>
      data.types.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroup(filteredResults);
  };


const handleDelete = async (groupId: string) => {
  try {
    console.log("groupId is", groupId);

    const token = userData?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    await axios.delete(`http://localhost:5000/api/v1/group/${groupId}`, config);
    // If successful, call the parent component handler to update the state
    // onGroupDeleted(groupToDelete!);
    console.log("Group deleted successfully");
         setEqubGroups(equbGroups.filter((group) => group._id !== groupId));
         setFilteredGroup(filteredGroup.filter((group) => group._id !== groupId));
  } catch (error) {
    console.error("Error deleting group:", error);
  } 
};


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Equb Groups</h1>
      <SearchUi handleSearch={handleSearch} search={"period"} />
      <Tables
        header={tableHead}
        datas={filteredGroup.length > 0 ? filteredGroup : filteredData}
        onDelete={handleDelete}
              />
    </div>
  );
};

export default ManageGroups;

