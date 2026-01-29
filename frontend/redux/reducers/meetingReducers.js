import { createSlice } from "@reduxjs/toolkit";
import {
  createMeeting,
  deleteMeeting,
  getMeeting,
  userMeetings,
} from "../actions/meetingActions";

const initialState = {
  meeting: undefined,
  meetings: [],
  meetings_featch: false,
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeeting.pending, (state) => {
        state.isLoading = false;
        state.message = "pending...";
      })
      .addCase(createMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(createMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMeeting.pending, (state) => {
        state.isLoading = false;
        state.message = "pending...";
      })
      .addCase(deleteMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(deleteMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(userMeetings.pending, (state) => {
        state.isLoading = false;
        state.message = "pending...";
      })
      .addCase(userMeetings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.meetings = action.payload;
        state.meetings_featch = true;
        state.message = "meeting created succefully ";
      })
      .addCase(userMeetings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        console.log(action.payload);
        state.message = action.payload;
      })
      .addCase(getMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.meeting = action.payload;
        state.message = "Meeting get it";
      })
      .addCase(getMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = meetingSlice.actions;

export default meetingSlice.reducer;
