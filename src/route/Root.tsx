import { useState } from "react";
import Navbar from "../components/Header";
import Banner from "../components/frame";
import { Outlet } from "react-router-dom";

const Root = () => {
  const [showBanner, setShowBanner] = useState(true);

  const handleCloseBanner = () => {
    setShowBanner(false);
  };
  return (
    <>
      {showBanner && <Banner onClose={handleCloseBanner} />}
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
