import React, { useState } from "react";

const AccountDetail: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    bankAccountNumber: "",
    id: null,
    collateral: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const nextPage = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevPage = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    // Your submission logic here
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      bankAccountNumber: "",
      id: null,
      collateral: null,
    });
    setStep(1); // Reset back to the first step
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Account Information
        </h2>
        {step === 1 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter your Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
              <button
                type="button"
                onClick={nextPage}
                className="bg-[#008B8B] hover:bg-[#7da7a7] text-white py-2 px-8 rounded mx-56 my-6"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter your City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="bankAccountNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Bank Account Number
              </label>
              <input
                type="text"
                id="bankAccountNumber"
                placeholder="Enter your Bank Account Number"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="id"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ID
              </label>
              <input
                type="file"
                id="id"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="collateral"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Collateral
              </label>
              <input
                type="file"
                id="collateral"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevPage}
                  className="bg-[#008B8B] hover:bg-[#7da7a7] text-white py-2 px-8 rounded mr-4 my-6"
                >
                  Previous
                </button>

                <button
                  type="submit"
                  className="bg-[#008B8B] hover:bg-[#7da7a7] text-white py-2 px-8 rounded my-6"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AccountDetail;
