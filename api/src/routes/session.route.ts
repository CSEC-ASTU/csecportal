import Router from "express";

import {
  createSession,
  deleteSession,
  getAllSessions,
  getSessionById,
  getSessionsByDivisionId,
  updateSession,
} from "../controllers/sessions.controller";

import { authenticateToken } from "../middlewares/auth.middleware";

const sessionRouter = Router();
sessionRouter.get("/", authenticateToken, getAllSessions);
sessionRouter.post("/new", authenticateToken, createSession);
sessionRouter.get("/:id", getSessionById);
sessionRouter.get("/divisions/:id", getSessionsByDivisionId);
sessionRouter.delete("/delete:id", authenticateToken, deleteSession);
sessionRouter.put("/update:id", updateSession);

export default sessionRouter;
