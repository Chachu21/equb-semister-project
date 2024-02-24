import React from "react";

interface CardProps {
  fullName: string;
  image: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ fullName, image, description }) => {
  return (
    <div className="border-4  border-[#35025c] border-solid max-w-xs w-96 mx-24 my-2 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-white p-4">
        <div className="flex justify-center">
          <img src={image} alt={fullName} className="rounded-full w-24 h-24" />
        </div>
        <h2 className="text-lg text-center font-bold mt-4">{fullName}</h2>
        <div className="flex justify-center mt-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current text-yellow-500"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0c-.28 0-.53.11-.71.29L6 4.58 1.71 6.29a1.003 1.003 0 0 0-.71 1.71l4.5 4.5-1.08 5.86a1 1 0 0 0 1.45 1.05L10 16.66l5.63 2.83a1 1 0 0 0 1.45-1.05l-1.08-5.86 4.5-4.5a1 1 0 0 0-.71-1.71L14 4.59 11.71 1.29A1.003 1.003 0 0 0 10 0zM6.77 4.1l2.47-2.48 2.47 2.47.96.97L11 7.57V12a1 1 0 0 0 .29.7l3.25 3.26-1.19 6.46L10 14.25 5.64 18.4l-1.19-6.46 3.25-3.26A1 1 0 0 0 8 12V7.57l-.2-.5.96-.97zM10 13a1 1 0 0 0 .29-.05l4.12-1.16-.85 4.61-3.47-1.74a1 1 0 0 0-.92 0l-3.47 1.74-.85-4.61 4.12 1.16c.11.03.22.05.33.05z"
              />
            </svg>
          ))}
        </div>
        <p className="text-sm text-center mt-2">{description}</p>
      </div>
     
    </div>
  );
};

export default Card;
