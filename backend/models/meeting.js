import { Schema, model } from "mongoose";

const meetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meetingCode: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Meeting = model("Meeting", meetingSchema);
export default Meeting;
