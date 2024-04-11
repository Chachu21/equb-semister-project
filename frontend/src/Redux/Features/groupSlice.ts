import { groupsType } from "./../../types/groupType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define initial state for groups
const initialState: groupsType = {
  _id: "",
  name: "",
  amount: 0,
  types: "",
  member: 0,
  members: [],
  status: "",
  createdOn: new Date().toString(),
  isCompleted: false,
  winners: [],
  createdBy: "",
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (_, action: PayloadAction<groupsType>) => {
      // Update the state with the payload
      console.log(action.payload);

      return { ...action.payload };
    },
  },
});

export const { setGroups } = groupSlice.actions;
export default groupSlice.reducer;
