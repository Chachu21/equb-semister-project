import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface cardProps {
  name: string;
  amount: number;
  No_member: number;
  createdAt: Date;
  types: string;
  equb_Group_id: string;
  status: string;
}

const Card: React.FC<cardProps> = ({
  name,
  amount,
  No_member,
  createdAt,
  types,
  equb_Group_id,
  status,
}) => {
  const [members, setMembers] = useState<number>(0);
  const navigate = useNavigate();
  const userStored = JSON.parse(localStorage.getItem("user_id") || "{}");
  const user_id = userStored.user_id;

  useEffect(() => {
    const fetchSingleEqubgroup = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/group/get/${equb_Group_id}`
      );
      setMembers(response.data.group.members.length);
    };

    fetchSingleEqubgroup();
  }, [equb_Group_id]);

  const handleJoin = async () => {
    try {
      if (!user_id) {
        navigate("/Login");
        return;
      }

      const joinResponse = await axios.get(
        `http://localhost:5000/api/v1/group/join/${equb_Group_id}`
      );

      toast.success("Successfully joined group");
      console.log(joinResponse.data);

      // Add any additional logic based on the join response
    } catch (error) {
      console.error(error);
    }
  };

  const formattedCreatedAt = new Date(createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="mt-5">
      <div className="flex container mx-auto flex-col p-5 md:p-6 space-y-4 justify-between items-start h-[340px] md:w-[400px] w-full  bg-white text-center border border-gray-300 dark:bg-neutral-700">
        <div className="flex justify-between">
          <div className="flex flex-col justify-evenly items-start space-y-8">
            <div className=" flex font-normal text-[18px] text-[#1F284F] dark:border-neutral-600 capitalize dark:text-neutral-50">
              <span className="text-normal text-[18px] mr-5">Name :</span>
              <span className="font-pacifico">{name}</span>
            </div>
            <div className=" flex font-normal text-[18px] text-[#1F284F] dark:border-neutral-600 capitalize dark:text-neutral-50">
              <span className="text-normal text-[18px] mr-5">type :</span>
              {types}
            </div>
            <div className=" text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-50">
              Members:
              <span className="ml-5 font-bold">
                ( {members}/{No_member} )<span className="px-3">joined</span>
              </span>
            </div>
            <div className=" text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-200">
              Amount: <span className="ml-5 font-bold"> {amount} Birr</span>
            </div>
            <div className="text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-50">
              <span>Created At:</span>
              <span className="ml-5 font-bold">{formattedCreatedAt}.</span>
            </div>
          </div>
          <span className="text-lg bg-yellow-200 rounded-lg  text-blue-900 h-fit px-3 py-1 font-semibold italic">
            {status}
          </span>
        </div>
        <button
          type="button"
          className="flex justify-center items-center rounded bg-[#008B8B] hover:bg-[#7da7a7]  w-full pb-2  text-[16px] font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-500-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleJoin}
        >
          Join Us
        </button>
      </div>
    </div>
  );
};

export default Card;
