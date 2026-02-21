import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";

import uploadFileRouter from "./routes/uploadFile.js";
import userRouter from "./routes/user.js";
import meetingRouter from "./routes/meeting.js";

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json("working");
});

app.use(uploadFileRouter);
app.use(userRouter);
app.use(meetingRouter);

const start = async () => {
  server.listen(8080, () => {
    console.log("Server running on port 8080");
  });
};

start();
