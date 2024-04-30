import { useState, useEffect } from "react";
import axios from "axios";
import { groupsType } from "../../../types/groupType";
import pendingImage from "../../../../public/assets/pending.jpg";
import completedImage from "../../../../public/assets/completed.jpg";
import startedImage from "../../../../public/assets/started.jpg";
import StatusCard from "./StatusCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import { setGroups } from "../../../Redux/Features/groupSlice";

const UserDashboardMainCard = () => {
  const Navigate = useNavigate();
  const [group, setGroup] = useState<groupsType[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    no_completed: 0,
    no_pending: 0,
    no_started: 0,
  });
  const [filteredGroups, setFilteredGroups] = useState<groupsType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
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
        const groupsData = response.data.group;
        setGroup(groupsData);
        setStatusCounts(response.data.count);

        // Fetch member data for each group
        const groupWithMemberData = await Promise.all(
          groupsData.map(async (group: groupsType) => {
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
    setFilteredGroups(filteredGroup);
  };

  useEffect(() => {
    if (filteredGroups.length > 0) {
      dispatch(setGroups(filteredGroups));
      Navigate("/userDashboard/statusdetailofgroup");
    }
  }, [filteredGroups, dispatch, Navigate]);

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            status={card.status}
            count={card.count}
            imageSrc={card.imageSrc}
            onClick={() => filterGroupByStatus(card.status)}
          />
        ))}
      </div>
    </>
  );
};

export default UserDashboardMainCard;
