import UserDashboardMainCard from "../UI/UserDashboardMainCard";
import UserTransaction from "../UI/UserTransaction";
// import LuckIdentifier from "./LuckIdentifier";

const main = () => {
  return (
    <div className="container justify-center mx-auto mt-3">
      <UserDashboardMainCard />
      <div className="grid grid-cols-1 md:grid-cols-2 min-w-full">
        <div className="w-full">
          <UserTransaction />
        </div>
        <p>in this part shows the details of each group</p>
        {/* <LuckIdentifier /> */}
      </div>
    </div>
  );
};

export default main;
