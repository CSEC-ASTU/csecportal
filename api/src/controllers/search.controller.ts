import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { errorResponse, successResponse } from "src/utils/response";

interface SearchItem {
  id: string;
  name: string;
  description?: string;
  date: string;
  category: string;
  slug: string;
}

export const globalSearch = async (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json(errorResponse("Query string `q` is required"));
  }

  const uri = process.env.DATABASE_URL;

  if (!uri) {
    return res.status(500).json(errorResponse("MongoDB URI not found"));
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    const regex = new RegExp(q, "i"); // case-insensitive

    // --- Search Queries ---
    const [users, divisions, articles, resources, events, sessions] =
      await Promise.all([
        db
          .collection("User")
          .find({
            $or: [{ freeName: regex }, { email: regex }, { note: regex }],
          })
          .toArray(),

        db
          .collection("Division")
          .find({
            $or: [{ name: regex }, { description: regex }],
          })
          .toArray(),

        db
          .collection("Article")
          .find({
            $or: [{ title: regex }, { content: regex }],
          })
          .toArray(),

        db
          .collection("Resource")
          .find({
            $or: [{ name: regex }, { description: regex }],
          })
          .toArray(),

        db
          .collection("Event")
          .find({
            $or: [
              { title: regex },
              { description: regex },
              { location: regex },
            ],
          })
          .toArray(),

        db
          .collection("Session")
          .find({
            $or: [
              { title: regex },
              { description: regex },
              { location: regex },
            ],
          })
          .toArray(),
      ]);

    // --- Map to SearchItem[] ---
    const results: SearchItem[] = [
      ...users.map((user) => ({
        id: user._id.toString(),
        name: user.freeName,
        description: user.note,
        date: user.createdAt?.toISOString() || new Date().toISOString(),
        category: "User",
        slug: `/users/${user._id}`,
      })),

      ...divisions.map((div) => ({
        id: div._id.toString(),
        name: div.name,
        description: div.description,
        date: div.createdAt?.toISOString() || new Date().toISOString(),
        category: "Division",
        slug: `/divisions/${div._id}`,
      })),

      ...articles.map((article) => ({
        id: article._id.toString(),
        name: article.title,
        description: article.content?.slice(0, 100),
        date: article.createdAt?.toISOString() || new Date().toISOString(),
        category: "Article",
        slug: `/articles/${article._id}`,
      })),

      ...resources.map((resource) => ({
        id: resource._id.toString(),
        name: resource.name,
        description: resource.description,
        date: resource.createdAt?.toISOString() || new Date().toISOString(),
        category: "Resource",
        slug: `/resources/${resource._id}`,
      })),

      ...events.map((event) => ({
        id: event._id.toString(),
        name: event.title,
        description: event.description,
        date: event.date?.toISOString() || new Date().toISOString(),
        category: "Event",
        slug: `/events/${event._id}`,
      })),

      ...sessions.map((session) => ({
        id: session._id.toString(),
        name: session.title,
        description: session.description,
        date: session.startTime?.toISOString() || new Date().toISOString(),
        category: "Session",
        slug: `/sessions/${session._id}`,
      })),
    ];

    return res.status(200).json(successResponse(results, "Search completed"));
  } catch (err: any) {
    console.error("Search error:", err);
    return res.status(500).json(errorResponse("Failed to perform search"));
  } finally {
    await client.close();
  }
};
