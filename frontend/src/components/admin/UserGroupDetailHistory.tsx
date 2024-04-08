// import  { useState } from 'react'
// import SearchUi from '../UI/SearchUi';
// import UserGroupManageTables from '../UI/UserGroupManageTables';

// const UserGroupDetailHistory = () => {
//   const header = [
//     { id: "1", title: "Status" },
//     { id: "2", title: "GroupName" },
//     { id: "3", title: "GroupDuration" },
//     { id: "4", title: "startedDate" },
//     { id: "5", title: "CompletedDate" },
//     { id: "6", title: "GroupSize" },
//     { id: "7", title: "Payment Method" },
//     { id: "8", title: "Action" },
//   ];

//   const userGroupManageData = [
//     {
//       id: "1",
//       status: "completed",
//       GroupName: "DerashEqub",
//       GroupDuration: "Weekly",
//       startedDate: "2024-02-20",
//       CompletedDate: "2024-02-20",
//       GroupSize: "10",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "2",
//       status: "notStarted",
//       GroupName: "DerashEqub",
//       GroupDuration: "Monthly",
//       startedDate: "-",
//       CompletedDate: "-",
//       GroupSize: "13",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "3",
//       status: "completed",
//       GroupName: "FetanEqub",
//       GroupDuration: "yearly",
//       startedDate: "2024-02-20",
//       CompletedDate: "2024-02-20",
//       GroupSize: "4",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "4",
//       status: "progress",
//       GroupName: "FriendsEqub",
//       GroupDuration: "Yearly",
//       startedDate: "2024-02-20",
//       CompletedDate: "-",
//       GroupSize: "24",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "5",
//       status: "started",
//       GroupName: "mullerEqub",
//       GroupDuration: "Weekly",
//       startedDate: "2024-02-20",
//       CompletedDate: "-",
//       GroupSize: "6",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "6",
//       status: "completed",
//       GroupName: "natiEqub",
//       GroupDuration: "monthly",
//       startedDate: "2024-02-20",
//       CompletedDate: "2024-02-20",
//       GroupSize: "9",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "7",
//       status: "progress",
//       GroupName: "chaleEqub",
//       GroupDuration: "Weekly",
//       startedDate: "2024-02-20",
//       CompletedDate: "-",
//       GroupSize: "10",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "8",
//       status: "progress",
//       GroupName: "gebreEqub",
//       GroupDuration: "Weekly",
//       startedDate: "2024-02-20",
//       CompletedDate: "-",
//       GroupSize: "12",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "9",
//       status: "progress",
//       GroupName: "DerashEqub",
//       GroupDuration: "yaerly",
//       startedDate: "2024-02-20",
//       CompletedDate: "-",
//       GroupSize: "7",
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "10",
//       status: "progress",
//       GroupName: "fetanEqub",
//       GroupDuration: "Weekly",
//       startedDate: "2024-02-20",
//       CompletedDate: "-",
//       GroupSize: "11",
//       paymentMethod: "telebirr",
//     },

//     // Add more transactions as needed
//   ];

//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filteredUserGroup, setFilteredUsergroup] = useState([]);

//   const handleSearch = (searchTerm: string) => {
//     setSearchTerm(searchTerm);
//     const filteredResults: any = userGroupManageData.filter((data) =>
//       data.status.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsergroup(filteredResults);
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold ml-5 mb-2">
//         UserGroupDetailHistory
//       </h1>
//       <SearchUi handleSearch={handleSearch} search={"status"} />
//       <UserGroupManageTables
//         header={header}
//         userGroupManageData={
//           filteredUserGroup.length > 0 ? filteredUserGroup : userGroupManageData
//         }
//       />
//     </div>
//   );
// };

// export default UserGroupDetailHistory

import  { useState } from 'react'
import SearchUi from '../UI/SearchUi';
import Tables from '../UI/Tables';
import UserGroupManageTables from '../UI/UserGroupManageTables';

const UserGroupDetailHistory = () => {
  const header = [
    { id: "1", title: "Status" },
    { id: "2", title: "GroupName" },
    { id: "3", title: "GroupDuration" },
    { id: "4", title: "startedDate" },
    { id: "5", title: "CompletedDate" },
    { id: "6", title: "GroupSize" },
    { id: "7", title: "Payment Method" },
    { id: "8", title: "Action" },
  ];

  const datas = [
    {
      id: "1",
      status: "completed",
      GroupName: "DerashEqub",
      GroupDuration: "Weekly",
      startedDate: "2024-02-20",
      CompletedDate: "2024-02-20",
      GroupSize: "10",
      paymentMethod: "Credit Card",
    },
    {
      id: "2",
      status: "notStarted",
      GroupName: "DerashEqub",
      GroupDuration: "Monthly",
      startedDate: "-",
      CompletedDate: "-",
      GroupSize: "13",
      paymentMethod: "Credit Card",
    },
    {
      id: "3",
      status: "completed",
      GroupName: "FetanEqub",
      GroupDuration: "yearly",
      startedDate: "2024-02-20",
      CompletedDate: "2024-02-20",
      GroupSize: "4",
      paymentMethod: "Credit Card",
    },
    {
      id: "4",
      status: "progress",
      GroupName: "FriendsEqub",
      GroupDuration: "Yearly",
      startedDate: "2024-02-20",
      CompletedDate: "-",
      GroupSize: "24",
      paymentMethod: "Credit Card",
    },
    {
      id: "5",
      status: "started",
      GroupName: "mullerEqub",
      GroupDuration: "Weekly",
      startedDate: "2024-02-20",
      CompletedDate: "-",
      GroupSize: "6",
      paymentMethod: "Credit Card",
    },
    {
      id: "6",
      status: "completed",
      GroupName: "natiEqub",
      GroupDuration: "monthly",
      startedDate: "2024-02-20",
      CompletedDate: "2024-02-20",
      GroupSize: "9",
      paymentMethod: "Credit Card",
    },
    {
      id: "7",
      status: "progress",
      GroupName: "chaleEqub",
      GroupDuration: "Weekly",
      startedDate: "2024-02-20",
      CompletedDate: "-",
      GroupSize: "10",
      paymentMethod: "Credit Card",
    },
    {
      id: "8",
      status: "progress",
      GroupName: "gebreEqub",
      GroupDuration: "Weekly",
      startedDate: "2024-02-20",
      CompletedDate: "-",
      GroupSize: "12",
      paymentMethod: "Credit Card",
    },
    {
      id: "9",
      status: "progress",
      GroupName: "DerashEqub",
      GroupDuration: "yaerly",
      startedDate: "2024-02-20",
      CompletedDate: "-",
      GroupSize: "7",
      paymentMethod: "Credit Card",
    },
    {
      id: "10",
      status: "progress",
      GroupName: "fetanEqub",
      GroupDuration: "Weekly",
      startedDate: "2024-02-20",
      CompletedDate: "-",
      GroupSize: "11",
      paymentMethod: "telebirr",
    },

    // Add more transactions as needed
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUserGroup, setFilteredUsergroup] = useState([]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults: any = datas.filter((data) =>
      data.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsergroup(filteredResults);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">
        UserGroupDetailHistory
      </h1>
      <SearchUi handleSearch={handleSearch} search={"status"} />
      <Tables
        header={header}
        datas={
          filteredUserGroup.length > 0 ? filteredUserGroup : datas
        }
      />
    </div>
  );
};

export default UserGroupDetailHistory

