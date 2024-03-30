
import { useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface RouteParams {
  token: string;
}

const ResetPassword: React.FC = () => {
   const navigate = useNavigate();
  const { token } = useParams<any>();
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ message: string }>(
        `http://localhost:5000/api/v1/users/resetPassword/${token}`,
        {
          password,
        }
      );
      setMessage(response.data.message);
      //clear password
      setPassword('')
      //navigate to login
         navigate("/login");

    } catch (error) {
      setMessage("An error occurred while resetting password");
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
      <h2 className="text-2xl mb-4">Reset Password</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default ResetPassword;
