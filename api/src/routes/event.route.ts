import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getPublicEvents,
} from "../controllers/event.controller";

const eventRouter = Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/publics", getPublicEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/", createEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
