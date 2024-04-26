import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/forgotpassword",
        {
          email: email, // Pass values.email
        }
      );
      console.log(response.data);

      if (response) {
        // Password reset email sent successfully
        // You can display a success message to the user or redirect them to another page
        console.log("Password reset email sent successfully");
        setEmail("");
        navigate("/");
      } else {
        // Handle error
        console.error("Failed to send password reset email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6 ml-24">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#008B8B] hover:bg-[#7da7a7] text-white p-3 rounded-lg font-semibold mb-4"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="bg-gray-100 text-center py-4">
        <p className="text-gray-600">
          Remembered your password?{" "}
          <Link to={"/login"} className="text-[#008B8B] font-semibold">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
