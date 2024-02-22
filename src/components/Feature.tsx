import React from "react";
import FeatureCard from "./FeatureCard";
import {
  faSave,
  faMoneyCheckAlt,
  faBell,
  faGauge,
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons

const Feature = () => {
  const featureData = [
    {
      title: "Searching",
      content:
        "Members contribute a fixed amount of money regularly into the equb pool, allowing them to save money over time.",
      icon: faSave, // Specify the icon for this feature
    },
    {
      title: "Dashboard",
      content:
        "Access to interest-free loans on a rotating basis, aiding in various financial needs.",
      icon: faGauge, // Specify the icon for this feature
    },
    {
      title: "Notification",
      content:
        " Provides banking-like services to individuals without access to traditional banks",
      icon: faBell, // Specify the icon for this feature
    },
    {
      title: "Searching",
      content:
        "Members contribute a fixed amount of money regularly into the equb pool, allowing them to save money over time.",
      icon: faSave, // Specify the icon for this feature
    },
    {
      title: "Dashboard",
      content:
        "Access to interest-free loans on a rotating basis, aiding in various financial needs.",
      icon: faMoneyCheckAlt, // Specify the icon for this feature
    },
    {
      title: "Notification",
      content:
        " Provides banking-like services to individuals without access to traditional banks",
      icon: faBell, // Specify the icon for this feature
    },
    // Add more features here with their respective icons
  ];

  return (
    <div className="mx-5 my-10">
      <h2 className="flex justify-center items-center my-5 pt-10 text-3xl text-[#1F284F] underline underline-offset-8">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-center place-items-center">
        {featureData.map((card, index) => (
          <FeatureCard
            key={index}
            title={card.title}
            content={card.content}
            icon={card.icon} // Pass the icon to FeatureCard
          />
        ))}
      </div>
    </div>
  );
};

export default Feature;
