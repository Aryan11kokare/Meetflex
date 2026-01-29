import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "..";

export const createMeeting = createAsyncThunk(
  "/meeting/create",
  async (user, thunkAPI) => {
    console.log(user);
    try {
      const responce = await clientServer.post(
        "/meeting",
        {
          title: user.title,
          date: user.date,
          duration: user.duration,
          meetingCode: user.meetingCode,
          description: user.description,
          time: user.time,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return thunkAPI.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userMeetings = createAsyncThunk(
  "/meeting/user",
  async (_, thunkAPI) => {
    try {
      const responce = await clientServer.get("/meeting", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkAPI.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const deleteMeeting = createAsyncThunk(
  "/meeting/delete",
  async (user, thunkAPI) => {
    try {
      const responce = await clientServer.delete(`/meeting/${user.meetingId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkAPI.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getMeeting = createAsyncThunk(
  "/meeting/cheak",
  async (user, thunkAPI) => {
    try {
      const responce = await clientServer.get("/meeting_Check", {
        headers: {
          code: user.meetingCode,
          token: localStorage.getItem("token"),
        },
      });
      return thunkAPI.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "/meeting/addUser",
  async (user, thunkAPI) => {
    try {
      const responce = await clientServer.post(
        "/addUser",
        {
          code: user.code,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return thunkAPI.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
