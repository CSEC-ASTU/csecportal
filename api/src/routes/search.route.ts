import { Router } from "express";
import { globalSearch } from "../controllers/search.controller";

const searchRouter = Router();

// GET /api/search?q=your-query
searchRouter.get("/search", globalSearch);

export default searchRouter;
