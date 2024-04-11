import axios from "axios";

const fetchUserData = async (id: string) => {
  console.log("user id", id);
  if (id) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/get/661567a80db711e9100fe5b5`
      );
      if (response.status === 200) {
        const user = response.data.user;
        return user;
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
};

export default fetchUserData;
