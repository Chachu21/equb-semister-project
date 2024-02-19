import { useState } from "react";


// i used email to recover from forget password
const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO
    // Handle forgot password logic
    console.log("Email:", email);
    // Reset form field
    setEmail("");
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
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold mb-4"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="bg-gray-100 text-center py-4">
        <p className="text-gray-600">
          Remembered your password?
           {/* TODO 
           here the login route must be './login'  */}
          <a href="#" className="text-blue-500 font-semibold">
            Login now
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
