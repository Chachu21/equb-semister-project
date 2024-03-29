import term from "../../public/term.jpg";

const WhoisEligible = () => {
  return (
    <div className="grid grid-cols-1, md:grid-cols-2 gap-6 w-full pt-5 md:pt-32 container mx-auto">
      <div className="py-4 bg-white rounded text-center order-1 md:order-1">
        <h1 className="text-2xl font-semibold mb-2 py-5 text-[#1F284F]">
          Who is eligible ?
        </h1>
        <div className="flex justify-center items-start">
          <p className="text-gray-700 text-[16px] md:text-[18px]  w-full leading-8 text-left">
            Eligibility within the እቁብ (EQUB) System is open to all individuals
            possessing the necessary information and consenting to the system's
            terms and policies. <br />
            <br />
            This inclusive approach ensures that anyone interested in
            participating can join the platform, fostering a diverse and dynamic
            community. Whether seeking to save, engage with others, or explore
            the system's offerings, all are welcome to become part of the EQUB
            experience, where opportunities for collective saving and
            collaboration abound.
          </p>
        </div>
      </div>
      <div className="order-2 md:order-2">
        <img
          src={term}
          alt="feedback"
          className="object-cover items-center rounded-md "
        />
      </div>
    </div>
  );
};

export default WhoisEligible;
