import { useState, useEffect } from "react";
import axios from "axios";
import ManageGroupTables from "../UI/ManageGroupTables";
import SearchUi from "../UI/SearchUi";
import Tables from "../UI/Tables";

interface GroupData {
  _id: string;
  period: string;
  groupName: string;
  member: string;
  Amount: Number;
  status: string;
}

interface EqubGroup {
  _id: string;
  types: string;
  name: string;
  members: number;
  amount: number;
  status: string;
}

const ManageGroups = () => {
  const [equbGroups, setEqubGroups] = useState<EqubGroup[]>([]);
  const [filteredGroup, setFilteredGroup] = useState<EqubGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/group");
      setEqubGroups(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    const filteredResults = equbGroups.filter((data) =>
      data.types.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroup(filteredResults);
  };

  const handleGroupDeleted = (deletedGroupId: string) => {
    setEqubGroups((prevGroups) =>
      prevGroups.filter((group) => group._id !== deletedGroupId)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Equb Groups</h1>
      <SearchUi handleSearch={handleSearch} search={"period"} />
      <Tables
        header={tableHead}
        equbGroups={filteredGroup.length > 0 ? filteredGroup : equbGroups}
        onGroupDeleted={handleGroupDeleted} // Pass the handler to child component
      />
    </div>
  );
};

export default ManageGroups;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import SearchUi from "../UI/SearchUi";
// import Tables from "../UI/Tables";

// interface EqubGroup {
//   _id: string;
//   types: string;
//   name: string;
//   members: number;
//   amount: number;
//   status: string;
// }

// const ManageGroups = () => {
//   const [equbGroups, setEqubGroups] = useState<EqubGroup[]>([]);
//   const [filteredGroup, setFilteredGroup] = useState<EqubGroup[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/v1/group");
//       setEqubGroups(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const tableHead = [
//     { id: "1", title: "ID" },
//     { id: "2", title: "Types" },
//     { id: "3", title: "GroupName" },
//     { id: "4", title: "Members" },
//     { id: "5", title: "Amount" },
//     { id: "6", title: "Status" },
//     { id: "7", title: "Actions" },
//   ];

//   const handleSearch = (searchTerm: string) => {
//     setSearchTerm(searchTerm);
//     const filteredResults = equbGroups.filter((data) =>
//       data.types.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredGroup(filteredResults);
//   };

//   const handleGroupDeleted = (deletedGroupId: string) => {
//     setEqubGroups((prevGroups) =>
//       prevGroups.filter((group) => group._id !== deletedGroupId)
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Equb Groups</h1>
//       <SearchUi handleSearch={handleSearch} search={"period"} />
//       <Tables
//         header={tableHead}
//         datas={filteredGroup.length > 0 ? filteredGroup : equbGroups} // Rename equbGroups to datas
//         // onGroupDeleted={handleGroupDeleted}
//       />
//     </div>
//   );
// };

// export default ManageGroups;
