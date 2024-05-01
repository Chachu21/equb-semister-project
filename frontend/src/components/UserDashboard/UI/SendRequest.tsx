import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SendRequest = () => {
  const [equbType, setEqubType] = useState<string>("");
  const [equbTypeLength, setEqubTypeLength] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [numMembers, setNumMembers] = useState<number>(0);
  const [errors, setErrors] = useState<any>({});

  const equbTypeOptions = ["Daily", "Weekly", "Monthly"];
  const dailyOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  const weeklyOptions = Array.from({ length: 4 }, (_, i) => i + 1);
  const monthlyOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  const validateForm = () => {
    const errors: any = {};
    if (!equbType) {
      errors.equbType = "Equb Type is required";
    }
    if (!equbTypeLength) {
      errors.equbTypeLength = "Equb Type Length is required";
    }
    if (!amount) {
      errors.amount = "Amount is required";
    }
    if (!numMembers) {
      errors.numMembers = "Number of Members is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/request/create", {
        equbType,
        equbTypeLength,
        amount,
        numMembers,
      });

      toast.success("request sent successfully");

      // Clear form fields
      setEqubType("");
      setEqubTypeLength(null);
      setAmount(0);
      setNumMembers(0);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="p-4 md:p-12 mx-auto md:w-3/4 lg:w-1/2 bg-gray-100 rounded-lg shadow-md my-4 space-y-4">
      <h1 className="font-semibold text-2xl text-center">
        Request Equb Group Creation
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="min-h-16">
          <label htmlFor="equbType" className="block text-lg text-gray-700">
            Equb Type
          </label>
          <select
            id="equbType"
            className={`form-select mt-1 h-10 border border-gray-400 bg-gray-100 rounded-lg block w-full ${
              errors.equbType ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => setEqubType(e.target.value)}
            value={equbType}
          >
            <option value="">Select Equb Type</option>
            {equbTypeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.equbType && (
            <p className="text-red-500  text-sm mt-1">{errors.equbType}</p>
          )}
        </div>

        {equbType === "Daily" && (
          <div>
            <label
              htmlFor="equbTypeLength"
              className="block text-lg text-gray-700"
            >
              Select Days
            </label>
            <select
              id="equbTypeLength"
              className={`form-select mt-2 block border border-gray-400 bg-gray-100  p-3 rounded-lg w-full ${
                errors.equbTypeLength ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setEqubTypeLength(parseInt(e.target.value))}
              value={equbTypeLength || ""}
            >
              <option value="">Select Days</option>
              {dailyOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.equbTypeLength && (
              <p className="text-red-500 text-sm mt-1">
                {errors.equbTypeLength}
              </p>
            )}
          </div>
        )}
        {equbType === "Weekly" && (
          <div>
            <label
              htmlFor="equbTypeLength"
              className="block text-lg text-gray-700"
            >
              Select Weeks
            </label>
            <select
              id="equbTypeLength"
              className={`form-select mt-2 block border border-gray-400 bg-gray-100  p-3 rounded-lg w-full ${
                errors.equbTypeLength ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setEqubTypeLength(parseInt(e.target.value))}
              value={equbTypeLength || ""}
            >
              <option value="">Select Weeks</option>
              {weeklyOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.equbTypeLength && (
              <p className="text-red-500 text-sm mt-1">
                {errors.equbTypeLength}
              </p>
            )}
          </div>
        )}
        {equbType === "Monthly" && (
          <div>
            <label
              htmlFor="equbTypeLength"
              className="block text-lg text-gray-700"
            >
              Select Months
            </label>
            <select
              id="equbTypeLength"
              className={`form-select mt-1 block border border-gray-400 bg-gray-100  p-3 rounded-lg w-full ${
                errors.equbTypeLength ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setEqubTypeLength(parseInt(e.target.value))}
              value={equbTypeLength || ""}
            >
              <option value="">Select Months</option>
              {monthlyOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.equbTypeLength && (
              <p className="text-red-500 text-sm mt-1">
                {errors.equbTypeLength}
              </p>
            )}
          </div>
        )}
        <div>
          <label htmlFor="amount" className="block text-lg text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className={`form-input mt-1 block border border-gray-400 bg-gray-100  p-3 rounded-lg w-full ${
              errors.amount ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            value={amount}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>
        <div>
          <label htmlFor="numMembers" className="block text-lg text-gray-700">
            Number of Members
          </label>
          <input
            type="number"
            id="numMembers"
            className={`form-input mt-1 block border border-gray-400 bg-gray-100  p-3 rounded-lg w-full ${
              errors.numMembers ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => setNumMembers(parseInt(e.target.value))}
            value={numMembers}
          />
          {errors.numMembers && (
            <p className="text-red-500 text-sm mt-1">{errors.numMembers}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#008B8B] text-white px-4 py-2 rounded hover:bg-[#3b6844] focus:outline-none focus:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendRequest;
