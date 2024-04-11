import axios from "axios";
import { useEffect, useState } from "react";
import { groupsType } from "../../../types/groupType";
import pendingImage from "../../../../public/assets/pending.jpg";
import completedImage from "../../../../public/assets/completed.jpg";
import startedImage from "../../../../public/assets/started.jpg";
// import { Link } from "react-router-dom";
import Pay from "../../payment/pay";

const UserDashboardMainCard = () => {
  const [isclicked, setIsClicked] = useState(false);
  const [group, setGroup] = useState<groupsType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [group_id, setGroup_id] = useState("");
  const [statusCounts, setStatusCounts] = useState({
    no_completed: 0,
    no_pending: 0,
    no_started: 0,
  });
  const [filteredGroups, setFilteredGroups] = useState<groupsType[]>([]);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user._id;
  const token = user.token;

  useEffect(() => {
    const fetchGroupByUserId = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/group/get/by/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGroup(response.data.group);
      setStatusCounts(response.data.count);
    };
    fetchGroupByUserId();
  }, [userId, token]);

  // Filter group by status
  const filterGroupByStatus = (status: string) => {
    const filteredGroup = group.filter(
      (group: groupsType) => group.status === status
    );
    setIsClicked(true);
    setFilteredGroups(filteredGroup);
  };

  const handlePayment = (group_id: string) => {
    setGroup_id(group_id);
    setShowModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {newFunction(
          "pending",
          statusCounts.no_pending,
          `${pendingImage}`,
          filterGroupByStatus
        )}
        {newFunction(
          "started",
          statusCounts.no_started,
          `${startedImage}`,
          filterGroupByStatus
        )}
        {newFunction(
          "completed",
          statusCounts.no_completed,
          `${completedImage}`,
          filterGroupByStatus
        )}
      </div>
      {isclicked && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredGroups.map((group) => (
            <div
              key={group._id}
              className="bg-white flex capitalize flex-col space-y-8 rounded-md border border-gray-100 p-6 mt-5 shadow-md shadow-black/5 "
            >
              <p>name of group : {group.name}</p>
              <p>no of group member : {group.member}</p>
              <p>amount of payment : {group.amount}</p>
              <p>status of group : {group.status}</p>
              {/* <div className="bg-sky-200 rounded-sm">
                {group.members.map((member, index) => (
                  {i will add user image and list group members}
                  <span key={index}>{member}</span>
                ))}
              </div> */}
              <div className="flex justify-end items-end">
                {group.status === "pending" && (
                  <button
                    onClick={() => {
                      handlePayment(group._id);
                    }}
                    className="w-fit px-8  rounded-md py-2 bg-[#2A2F4C] text-white font-bold text-xl "
                  >
                    pay now
                  </button>
                )}
                <Pay
                  group_id={group_id}
                  isOpen={showModal}
                  onClose={() => {
                    setShowModal(false);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserDashboardMainCard;

function newFunction(
  status: string,
  count: number,
  srcs: string,
  onclick: (status: string) => void
) {
  return (
    <div
      className="bg-white rounded-md border border-gray-100 p-6 mt-5 shadow-md shadow-black/5"
      onClick={() => onclick(status)}
    >
      <div className="flex flex-col items-center justify-center relative">
        <img src={srcs} alt={status} className="w-40 h-40 " />
        <div className="text-2xl font-semibold mb-1 absolute -top-5 left-1/2 text-[#0920CE]">
          {count}
        </div>
      </div>
    </div>
  );
}
