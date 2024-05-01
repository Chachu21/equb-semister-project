const HowItWorks = () => {
  return (
    <div className="flex container mx-auto w-full justify-center">
      <div className="flex flex-col space-y-5 mt-10 justify-center">
        <h2 className="flex justify-center items-center my-12 pt-10 text-3xl text-[#1F284F] underline underline-offset-8">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-24 justify-center text-gray-500">
          <div className="flex items-center mx-4 mb-8 md:mb-0">
            <div className="bg-[#008B8B] text-white rounded-full w-16 h-16 flex items-center justify-center text-md font-bold m-6">
              1
            </div>
            <div className="max-w-xs">
              Sign Up or Log In: If you're a new user, you'll need to sign up
              for an account on the EQUB system. If you already have an account,
              simply log in using your credentials.
            </div>
          </div>
          <div className="flex items-center mx-4 mb-8 md:mb-0">
            <div className="bg-[#008B8B] text-white rounded-full w-16 h-16 flex items-center justify-center text-md font-bold m-6">
              2
            </div>
            <div className="max-w-xs ">
              Join or request to create a Group: Once logged in, you can join
              either an existing or a new equb group. after joining an equb
              group member must fulfill all nessessary requirments listed on the
              platform.
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-24 justify-center text-gray-500">
          <div className="flex items-center mx-4 mb-8 md:mb-0">
            <div className="bg-[#008B8B] text-white rounded-full w-16 h-16 flex items-center justify-center text-md font-bold m-6">
              3
            </div>
            <div className="max-w-xs">
              Join an EQUB Cycle: Once your group is established, you can join
              an EQUB cycle. This involves committing to making regular
              contributions according to the group's rules.
            </div>
          </div>
          <div className="flex items-center mx-4 mb-8 md:mb-0">
            <div className="bg-[#008B8B] text-white rounded-full w-16 h-16 flex items-center justify-center text-md font-bold m-6">
              4
            </div>
            <div className="max-w-xs">
              Wait for Rotation: After all members have made their contributions
              for the cycle, the EQUB system will initiate a rotation. This
              typically involves randomly selecting a member to receive the
              collected money for that cycle.
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-24 justify-center text-gray-500">
          <div className="flex items-center mx-4 mb-8 md:mb-0">
            <div className="bg-[#008B8B] text-white rounded-full w-16 h-16 flex items-center justify-center text-md font-bold m-6">
              5
            </div>
            <div className="max-w-xs">
              Receive Payout: If you're selected to receive the money, you'll
              receive the payout by selecting one or two members as garantee or
              colatorial based on rotation schedule. After receiving your
              payout, you'll continue to make contributions according to the
              group's schedule. The cycle repeats until all members have
              received their payouts.
            </div>
          </div>
          <div className="flex items-center mx-4 mb-8 md:mb-0">
            <div className="bg-[#008B8B] text-white rounded-full w-16 h-16 flex items-center justify-center text-md font-bold m-6">
              6
            </div>
            <div className="max-w-xs">
              Provide Feedback: If the EQUB system has a feedback mechanism, use
              it to provide suggestions for improvement or report any issues you
              encounter while using the platform.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
