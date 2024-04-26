import { useState, useEffect } from "react";
import axios from "axios";
import { groupsType } from "../../../types/groupType";
import pendingImage from "../../../../public/assets/pending.jpg";
import completedImage from "../../../../public/assets/completed.jpg";
import startedImage from "../../../../public/assets/started.jpg";
import StatusCard from "./StatusCard";
import Pay from "../../payment/pay";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

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
  const userId = user?._id;
  const token = user?.token;

  useEffect(() => {
    const fetchGroupByUserId = async () => {
      try {
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

        // Fetch member data for each group
        const groupWithMemberData = await Promise.all(
          response.data.group.map(async (group: groupsType) => {
            const memberData = await fetchMemberData(group.members);
            return { ...group, members: memberData };
          })
        );
        setGroup(groupWithMemberData);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    fetchGroupByUserId();
  }, [userId, token]);

  const statusCards = [
    {
      status: "pending",
      count: statusCounts.no_pending,
      imageSrc: pendingImage,
    },
    {
      status: "started",
      count: statusCounts.no_started,
      imageSrc: startedImage,
    },
    {
      status: "completed",
      count: statusCounts.no_completed,
      imageSrc: completedImage,
    },
  ];

  const fetchMemberData = async (memberIds: string[]) => {
    try {
      const memberPromises = memberIds.map(async (memberId) => {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/get/${memberId}`
        );
        return response.data.user; // Assuming the user data is under the 'user' property
      });
      const memberData = await Promise.all(memberPromises);
      return memberData;
    } catch (error) {
      console.error("Error fetching member data:", error);
      return [];
    }
  };

  const filterGroupByStatus = (status: string) => {
    const filteredGroup = group.filter(
      (group: groupsType) => group.status === status
    );
    setIsClicked(true);
    setFilteredGroups(filteredGroup);
  };

  const handlePayment = (groupId: string) => {
    setGroup_id(groupId);
    setShowModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            status={card.status}
            count={card.count}
            imageSrc={card.imageSrc}
            onClick={filterGroupByStatus}
          />
        ))}
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
              {group.rounds.map((round, index) => (
                <div key={index}>
                  <p>
                    Winner for Round {round.round_no}:{" "}
                    {round.winner ? round.winner : "Not selected yet"}
                  </p>
                </div>
              ))}
              <div className="flex justify-end items-end">
                {group.status === "started" && (
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
                  amount={group.amount}
                  group_id={group_id}
                  isOpen={showModal}
                  round={group.round}
                  onClose={() => {
                    setShowModal(false);
                  }}
                />
              </div>
              <div className="bg-sky-200 rounded-lg flex items-center justify-between p-1">
                {group.status === "pending" &&
                  group.members.map((member, index) => (
                    <div key={index} className="flex space-x-10">
                      <div className="flex flex-col space-y-1">
                        <img
                          src={member.imageUrl.url}
                          alt={member.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <p className="text-sm">{member.name}</p>
                      </div>
                      <div className="flex flex-col space-y-1 text-sm">
                        <h3 className="underline">contact Info</h3>
                        <p>
                          <span>
                            <MdOutlineEmail />
                          </span>
                          {member.email}
                        </p>
                        <p>
                          {" "}
                          <span>
                            <FaPhoneAlt />
                          </span>
                          {member.phone}
                        </p>
                      </div>
                      <div className="flex flex-col space-1">
                        <h3 className="font-pacifico ">status</h3>
                        <span className="text-sm">not yet winner</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserDashboardMainCard;
