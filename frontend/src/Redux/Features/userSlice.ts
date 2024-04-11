import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  _id: string;
  // name: string;
  // email: string;
  role: string;
  token: string;
}

interface UserState {
  user: UserType | null; // Update to single user instead of array of users
  isClicked: boolean;
  isLogin: boolean;
}

// Function to retrieve user data from localStorage
const getUserData = (): UserType | null => {
  const userDataString = localStorage.getItem("user");
  return userDataString ? JSON.parse(userDataString) : null;
};

const initialState: UserState = {
  user: getUserData(), // Initialize with user data fetched from localStorage
  isLogin: false,
  isClicked: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    menuBar: (state) => {
      state.isClicked = !state.isClicked;
    },
    closeMenuBar: (state) => {
      state.isClicked = false;
    },
    loginSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLogin = false;
      state.isClicked = false;
      localStorage.removeItem("user"); // Remove user data from localStorage
    },
  },
});

export const { menuBar, loginSuccess, logoutSuccess, closeMenuBar } =
  userSlice.actions;
export default userSlice.reducer;
