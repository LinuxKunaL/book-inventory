import { createSlice } from "@reduxjs/toolkit";

/**
 * @Slice ProgressLoadingSlice helps
 * to manage the perfecting 
 * loading top bar state 
 * */
const ProgressLoadingSlice = createSlice({
  name: "progressLoading",
  initialState: false,
  reducers: {
    setProgress: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setProgress } = ProgressLoadingSlice.actions;
export default ProgressLoadingSlice.reducer;
