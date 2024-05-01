import { useState } from "react";

import Pay from "../../payment/pay";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const DetailOfGroupType = () => {
  const filteredGroups = useSelector((state: RootState) => state.group);
  console.log("from redux", filteredGroups);
  const [showModal, setShowModal] = useState(false);
  const [group_id, setGroup_id] = useState("");

  const handlePayment = (groupId: string) => {
    setGroup_id(groupId);
    setShowModal(true);
  };
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {filteredGroups.map((group) => (
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
          {group.rounds.map((round, index) => (
            <div key={index}>
              <p>
                Winner for Round {round.round_no}
                <div className="flex font-semibold">
                  {round.winner ? round.winner.name : "Not selected yet"}
                </div>
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
          <div className="rounded-lg flex flex-col space-y-8 justify-evenly p-1">
            {group.status === "pending" &&
              group.members.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#E5E7EB] flex justify-between py-3 space-x-2 rounded-md px-2"
                >
                  <div className="flex flex-col space-y-1">
                    <img
                      src={member.imageUrl.url}
                      alt={member.name}
                      className="w-[70px] h-[70px] rounded-full"
                    />
                    <p className="text-sm text-gray-500">{member.name}</p>
                  </div>
                  <div className="flex flex-col space-y-1 text-sm">
                    <h3 className="underline font-bold text-[#008B8B]">
                      contact Info
                    </h3>
                    <p className="max-w-xs break-all">
                      <span>
                        <MdOutlineEmail size={20} />
                      </span>
                      <span className="text-gray-500 lowercase">
                        {member.email}
                      </span>
                    </p>
                    <p>
                      <span>
                        <FaPhoneAlt size={20} />
                      </span>
                      <span className="text-gray-500"> {member.phone}</span>
                    </p>
                  </div>
                  <div className="flex flex-col space-1">
                    <h3 className="font-pacifico text-[#008B8B]">status</h3>
                    <span className="text-sm">not yet winner</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailOfGroupType;
