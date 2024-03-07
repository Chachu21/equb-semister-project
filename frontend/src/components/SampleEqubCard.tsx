import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface cardProps {
  amount: number;
  No_member: number;
  createdAt: Date;
  equb_type_id: string;
  equb_Group_id: string;
}

const Card: React.FC<cardProps> = ({
  amount,
  No_member,
  createdAt,
  equb_type_id,
  equb_Group_id,
}) => {
  const [typeName, setTypeName] = useState<string>("");
  const navigate = useNavigate();
  const userStored = JSON.parse(localStorage.getItem("user_id") || "{}");
  const user_id = userStored.user_id;

  useEffect(() => {
    const fetchTypeName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/v1/types/${equb_type_id}`
        );
        setTypeName(response.data.equb_type_name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTypeName();
  }, [equb_type_id]);

  const handleJoin = async () => {
    try {
      if (!user_id) {
        navigate("/group");
        return;
      }

      const checkResponse = await axios.get(
        `http://localhost:5003/api/v1/groups/check/${user_id}/${equb_Group_id}`
      );

      if (checkResponse.data.exists) {
        toast.warning("Already joined equb group");
        return;
      }

      const joinResponse = await axios.post(
        `http://localhost:5003/api/v1/groups/join/${user_id}/${equb_Group_id}`
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
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <div className="mt-5">
      <div className="flex flex-col p-5 space-y-4 justify-between items-start h-[340px] w-[340px] bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.15),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="flex flex-col justify-start items-start space-y-8">
          <div className=" flex font-bold text-[18px] text-[#1F284F] dark:border-neutral-600 capitalize dark:text-neutral-50">
            <span className="text-normal text-[18px] mr-5">type :</span>
            {typeName}
          </div>
          <div className=" text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-50">
            Members: <span className="ml-5 font-bold"> 999/{No_member}</span>
          </div>
          <div className=" text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-200">
            Amount: <span className="ml-5 font-bold"> {amount}</span>
          </div>
          <div className="text-[18px] font-normal leading-tight text-[#1F284F] dark:text-neutral-50">
            <span>Created At:</span>
            <span className="ml-5 font-bold">{formattedCreatedAt}.</span>
          </div>
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
