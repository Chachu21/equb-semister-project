import React from "react";

const WhoisEligible = () => {
  return (
    <div className="flex flex-col judtify-center items-center md:px-[50px] w-full pt-32 container mx-auto">
      <div className="p-4 bg-white rounded text-center h-64 ">
        <h1 className="text-2xl font-semibold mb-2 p-3">Who is eligible ?</h1>
        <div className="flex justify-center items-start">
          <p className="text-gray-700 p-2 md:w-[680px] w-full text-left">
            Eligibility within the እቁብ (EQUB) System is open to all individuals
            possessing the necessary information and consenting to the system's
            terms and policies. <br />
            This inclusive approach ensures that anyone interested in
            participating can join the platform, fostering a diverse and dynamic
            community. Whether seeking to save, engage with others, or explore
            the system's offerings, all are welcome to become part of the EQUB
            experience, where opportunities for collective saving and
            collaboration abound.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoisEligible;
