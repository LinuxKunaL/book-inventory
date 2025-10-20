import { configureStore } from "@reduxjs/toolkit";
import meSlice from "./slices/admin/meSlice";
import load from "./slices/others/progressLoading";
import notificationSlice from "./slices/student/notificationSlice";

const store = configureStore({
  reducer: {
    meSlice: meSlice,
    loadingSlice: load,
    notificationSlice: notificationSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
