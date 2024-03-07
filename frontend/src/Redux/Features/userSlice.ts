import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  _id: string;
  name: string;
  email: string;
}

interface UserState {
  user: UserType[];
  isClicked: boolean;
  isLogin: boolean;
}

const initialState: UserState = {
  user: [],
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
    loginSuccess: (state, action: PayloadAction<UserType[]>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.user = []; // Set user to an empty array instead of null
      state.isLogin = false; // Update isLogin state
      state.isClicked = false; // Reset isClicked state
      localStorage.clear(); // Clear local storage if needed
    },
  },
});

export const { menuBar, loginSuccess, logoutSuccess, closeMenuBar } =
  userSlice.actions;
export default userSlice.reducer;
