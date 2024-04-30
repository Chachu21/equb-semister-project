import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  count: number;
}

const initialState: RequestState = {
  count: 0,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    resetCount: (state) => {
      state.count = 0;
    },
  },
});

export const { setCount, resetCount } = requestSlice.actions;
export default requestSlice.reducer;
