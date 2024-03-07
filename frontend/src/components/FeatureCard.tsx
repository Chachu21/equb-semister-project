import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface FeatureCardProps {
  title: string;
  content: string;
  icon: IconDefinition; // Accept an icon prop
}

const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  return (
    <div className="my-16">
      <div className="w-[300px] shadow-lg border-gray-50 border-2 bg-white h-[300px] rounded-[18px]">
        <div className="flex flex-col justify-center items-center space-y-2 mt-6 px-8 w-[300px]">
          <FontAwesomeIcon
            icon={props.icon}
            size="2x"
            className="text-[#008B8B]"
          />
          {/* Use props.icon */}
          <h2 className="text-2xl font-bold text-[#1F284F]">{props.title}</h2>
          <p className="text-sm leading-6 text-gray-500 font-normal">
            {props.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
