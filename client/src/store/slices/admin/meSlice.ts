import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IMeState {
  _id: string;
  username: string;
}

const meSlice = createSlice({
  name: "me",
  initialState: {
    _id: "",
    username: "",
  },
  reducers: {
    setMe: (_, action:PayloadAction<IMeState>) => {
      return ( action.payload);
    },
  },
});

export const { setMe } = meSlice.actions;
export default meSlice.reducer;
