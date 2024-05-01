import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { groupsType } from "../../../types/groupType";
import { usersType } from "../../../types/usersType";
import { toast } from "react-toastify";

const Payout = () => {
  const [winnerGroups, setWinnerGroups] = useState<groupsType[]>([]);
  const [userData, setUserData] = useState<usersType>();
  //   const [showModal, setShowModal] = useState(false);
  //   const [users, setUsers] = useState<usersType[]>([]); // Initialize as empty array

  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?._id;
  const token = user?.token;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/group/get/by/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Filter groups based on userId in winners array
        const filteredGroups = res.data.group.filter(
          (group: groupsType) =>
            userId !== undefined && group.winners.includes(userId)
        );
        setWinnerGroups(filteredGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [userId, token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/users/get/${userId}`
        );
        setUserData(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handlePayout = async (groupId: string) => {
    console.log(`Payout for group with ID: ${groupId}`);
    //first check user is eligible to receive payments

    // secondly check the user is already recevied payments
    const group = winnerGroups.find((group) => group._id === groupId);
    // //fetch user data from backend
    // const usersDataPromises: Promise<any>[] = [];
    // group?.members.forEach((member) => {
    //   usersDataPromises.push(
    //     axios
    //       .get(`http://localhost:5000/api/v1/users/get/${member._id}`)
    //       .then((res) => res.data.user)
    //       .catch((error) => {
    //         console.error("Error fetching user data:", error);
    //         return null; // Return null in case of error to handle it later
    //       })
    //   );
    // });

    // // Wait for all user data promises to resolve
    // const resolvedUsersData = await Promise.all(usersDataPromises);
    // setUsers(resolvedUsersData); // Set users state after promises are resolved

    const round = group?.rounds.find((round) => round.winner === userId);
    if (userId && round && round.receivedPayment) {
      toast.warning("You have already received payments for this round");
    }

    //if user not recive payments, the user must present garantee at least one and if the user is final winner he hasnit present grantee
    if (userId && round && !round.receivedPayment) {
      if (!userData?.is_approved) {
        toast.warning(
          "you have't approvied account , please update your account information details"
        );
      }
    }

    toast.success("your request is sent successfully");
    //finally recive payments and update rounds data by adding garanteelist and amount he recieved
  };

  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {winnerGroups.map((group) => (
          <div
            key={group._id}
            className="bg-white flex capitalize flex-col space-y-8 rounded-md border border-gray-100 p-6 mt-5 shadow-md shadow-black/5 "
          >
            <p>name of group : {group.name}</p>
            <p>no of group member : {group.member}</p>
            <p>amount of payment : {group.amount}</p>
            {group.status === "started" && (
              <p>current round for payment :{group.round}</p>
            )}
            <p>status of group : {group.status}</p>
            <p>Won Rounds:</p>
            <ul>
              {group.rounds
                .filter((round) => round.winner && round.winner._id === userId)
                .map((round, index) => (
                  <div key={index}>
                    <p>
                      <span className="text-[#D4AF37] mr-3">
                        You are the Winner of Round
                      </span>
                      {round.round_no}
                    </p>
                  </div>
                ))}
            </ul>
            <div className="flex justify-end items-end">
              <button
                onClick={() => handlePayout(group._id)}
                className="w-fit px-8 rounded-md py-2 bg-[#2A2F4C] text-white font-bold text-xl"
              >
                Payout
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* {showModal && (
        <div
          className={`fixed z-50 inset-0 overflow-y-scroll md:overflow-hidden ${
            showModal ? "" : "hidden"
          }`}
        >
          <div className="flex container mx-auto items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-black opacity-70"
              onClick={() => setShowModal(false)}
            />
            <div className="relative flex flex-col items-center py-3 px-5  md:space-y-2 bg-gray-100 rounded-lg  w-full md:max-w-2xl min-h-screen md:min-h-[80vh]">
              <span
                className="absolute top-0 right-5 px-2 cursor-pointer hover:text-red-500 bg-white text-5xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <div>
                {users.map((user) => (
                  <div key={user._id}>
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Payout;
