import axios from "axios";
import SpinningWheel from "../UI/SpinningWheel";
import { toast } from "react-toastify";

const LuckIdentifier = () => {
  //for fetching group members

  const onFinished = async (winner: string) => {
    const resp = await axios.put(
      `http://localhost:5000/api/v1/group/winner/6606711885135001e805c790`,
      {
        userId: winner,
      }
    );
    console.log(resp);

    toast.success(`congragulation  from ${winner}`);
  };

  return (
    <div className="font-sans text-center flex flex-col">
      <div className="mt-8">
        <SpinningWheel
          winningSegment=""
          onFinished={(winner: string) => onFinished(winner)}
          primaryColor="black"
          primaryColoraround="#ffffffb4"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={190}
          upDuration={50}
          downDuration={2000}
          // slices={}
        />
      </div>
    </div>
  );
};

export default LuckIdentifier;
