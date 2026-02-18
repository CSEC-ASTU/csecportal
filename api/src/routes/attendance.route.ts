import { Router } from "express";
import {
  getPersonAttendance,
  getSessionAttendance,
  markAttendance,
  // updateAttendance,
} from "../controllers/attendance.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { getHeadSessions } from "../controllers/attendance.controller";

const attendanceRouter = Router();
attendanceRouter.get("/head-sessions", authenticateToken, getHeadSessions);

attendanceRouter.get("/:sessionId", authenticateToken, getSessionAttendance);

attendanceRouter.post("/new", authenticateToken, markAttendance);
attendanceRouter.get(
  "/member/:memberId",
  authenticateToken,
  getPersonAttendance
);

// PATCH or PUT: Update attendance record status or other fields
// attendanceRouter.put("/:attendanceId", updateAttendance);

export default attendanceRouter;
