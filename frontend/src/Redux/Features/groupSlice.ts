import { groupsType } from "./../../types/groupType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define initial state for groups
const initialState: groupsType[] = []; // Change initial state to an empty array

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<groupsType[]>) => {
      console.log(action.payload);
      // Update the state with the payload
      return action.payload;
    },
  },
});

export const { setGroups } = groupSlice.actions;
export default groupSlice.reducer;
