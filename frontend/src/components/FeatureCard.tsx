import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface FeatureCardProps {
  title: string;
  content: string;
  icon: IconDefinition; // Accept an icon prop
}

const FeatureCard = (props: FeatureCardProps) => {
  return (
    <div className=" my-3 md:my-2 mx-auto container">
      <div className="w-full md:w-[430px] shadow-sm border-gray-50 border-2 bg-white h-auto p-10 rounded-[18px]">
        <div className="flex flex-col justify-center items-center space-y-2  px-8 w-full h-full">
          <FontAwesomeIcon
            icon={props.icon}
            size="2x"
            className="text-[#008B8B]"
          />
          {/* Use props.icon */}
          <h2 className="text-2xl leading-6 font-bold text-[#1F284F]">
            {props.title}
          </h2>
          <p className="text-[16px] leading-6 text-gray-500 font-normal justify-start text-center">
            {props.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
