import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  count: number;
  reload: number;
};

const notificationSlice = createSlice({
  name: "notificationCount",
  initialState: {
    count: 0,
    reload: 0,
  },
  reducers: {
    setNotificationCount: (
      state: TInitialState,
      action: PayloadAction<number | string>
    ) => {
      if (typeof action.payload === "string") {
        state.count += 1;
      } else {
        state.count = action.payload;
      }
    },
    setNotificationDataReload: (state: TInitialState) => {
      state.reload += 1;
    },
  },
});

export const { setNotificationCount, setNotificationDataReload } =
  notificationSlice.actions;
export default notificationSlice.reducer;
