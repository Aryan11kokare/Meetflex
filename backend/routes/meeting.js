import { Router } from "express";
import {
  addParticipant,
  createMeeting,
  deleteMeeting,
  getMeeting,
  userMeetings,
} from "../controllers/meeting.js";
import { authMiddleware } from "../middleware.js";
const router = Router();

router.get("/meeting", authMiddleware, userMeetings);
router.get("/meeting_Check", authMiddleware, getMeeting);
router.post("/addUser", authMiddleware, addParticipant);
router.post("/meeting", authMiddleware, createMeeting);
router.delete("/meeting/:id", authMiddleware, deleteMeeting);

export default router;
