import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  meetings: [
    {
      meetingId: {
        type: String,
      },
      title: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      description: {
        type: String,
      },
    },
  ],
});

const User = model("User", userSchema);
export default User;
