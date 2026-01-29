import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/userReducers.js";
import meetingReducers from "./reducers/meetingReducers.js";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    meeting: meetingReducers,
  },
});
