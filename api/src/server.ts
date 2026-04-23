import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import { prisma } from "./config/db";
import errorMiddleware from "./middlewares/error.middleware";
import path from "path";
import smtpService from "./services/smtp.service";
import { authController } from "./controllers/auth.controller";

// Routes
import authRoutes from "./routes/auth.routes";
import divisionRoutes from "./routes/division.routes";
import roleRoutes from "./routes/role.routes";
import memberRoutes from "./routes/member.routes";
import reminderRoutes from "./routes/reminder.routes";
import groupRoutes from "./routes/group.routes";
import divisionHeadRoutes from "./routes/division-head.routes";
import divisionMembersRoutes from "./routes/division-members.routes";
import presidentMembersRoutes from "./routes/president-members.routes";
import testimonialRouter from "./routes/testimonial.route";
import faqRouter from "./routes/faq.route";
import rulesRouter from "./routes/rules.route";
import sessionRouter from "./routes/session.route";
import eventRouter from "./routes/event.route";
import attendanceRouter from "./routes/attendance.route";
import resourcesRouter from "./routes/resources.route";
import articleRouter from "./routes/article.routes";
import driveRoutes from "./routes/drive.routes";

// Load environment variables FIRST
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();

// CORS configuration - Moved to top for reliability
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://localhost:5173",
  "http://localhost:5500",
];

const envAllowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isPrivateNetworkHost = (hostname: string) => {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  );
};

const isAllowedOrigin = (origin: string) => {
  if (allowedOrigins.includes(origin) || envAllowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);

    if (process.env.NODE_ENV !== "production" && isPrivateNetworkHost(hostname)) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps/curl)
    if (!origin) return callback(null, true);

    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    console.warn(`⚠️ CORS blocked origin: ${origin}`);
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cookie"],
  exposedHeaders: ["Set-Cookie"]
}));

// Debug middleware
app.use((req, _res, next) => {
  if (req.method === "OPTIONS") {
    console.log(`� Preflight request: ${req.method} ${req.path} from ${req.headers.origin}`);
  } else {
    console.log(`📝 ${req.method} ${req.path}`);
  }
  next();
});

// Try multiple ports if the default one is in use
const defaultPort = parseInt(process.env.PORT || "5500");
let port = defaultPort;

// Middleware
app.use(morgan("dev"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "csec-astu-portal-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

const API_PREFIX = "/api";

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/divisions`, divisionRoutes);
app.use(`${API_PREFIX}/roles`, roleRoutes);
app.use(`${API_PREFIX}/members`, memberRoutes);
app.use(`${API_PREFIX}/reminders`, reminderRoutes);
app.use(`${API_PREFIX}/groups`, groupRoutes);
app.use(`${API_PREFIX}/division-heads`, divisionHeadRoutes);
app.use(`${API_PREFIX}/division-members`, divisionMembersRoutes);
app.use(`${API_PREFIX}/president-members`, presidentMembersRoutes);
app.use(`${API_PREFIX}/articles`, articleRouter);
app.use(`${API_PREFIX}/drive`, driveRoutes);
app.use(`${API_PREFIX}/testimonials`, testimonialRouter);
app.use(`${API_PREFIX}/faqs`, faqRouter);
app.use(`${API_PREFIX}/rules`, rulesRouter);
app.use(`${API_PREFIX}/sessions`, sessionRouter);
app.use(`${API_PREFIX}/events`, eventRouter);
app.use(`${API_PREFIX}/attendance`, attendanceRouter);
app.use(`${API_PREFIX}/resources`, resourcesRouter);
app.use(`${API_PREFIX}/search`, resourcesRouter);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🌟 Welcome to CSEC ASTU Portal API",
    version: "1.0.0",
  });
});

// Health check endpoint
app.get("/health", (_req, res) => {
  const smtpStatus = smtpService.getStatus();
  res.status(200).json({
    status: "✅ OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    smtp: {
      status: smtpStatus.isValid ? "✅ Connected" : "❌ Disconnected",
      lastChecked: smtpStatus.lastChecked,
      lastError: smtpStatus.lastError,
    },
  });
});

// Catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Connect to database and start server
const startServer = async () => {
  try {
    try {
      await prisma.$connect();
      console.log("🛢️ Connected to PostgreSQL via Prisma successfully");

      console.log("🔧 Checking and fixing multiple PRESIDENT roles...");
      await authController.fixMultiplePresidentRoles();
    } catch (dbError) {
      console.error("Failed to connect to Database:", dbError);
      console.log("⚠️ Please check your DATABASE_URL in .env file");
      console.log("⚠️ Make sure your IP is whitelisted in your Database Provider");
      console.log(
        "⚠️ Continuing server startup in mock mode - database operations will not work"
      );

    }

    console.log("Skipping admin user creation to avoid Prisma errors");

    await smtpService.startMonitoring();

    const startWithPortFallback = (
      attemptPort: number,
      maxAttempts: number = 3
    ) => {
      const server = app.listen(attemptPort, "0.0.0.0", () => {
        console.log(`✅ CSEC ASTU Portal API started successfully!`);
        console.log(`🚀 Server running at http://localhost:${attemptPort}`);
        console.log(
          `🔍 Health check available at http://localhost:${attemptPort}/health`
        );
        console.log(`📚 API Documentation: http://localhost:${attemptPort}`);
      });

      server.on("error", (err: any) => {
        if (err.code === "EADDRINUSE" && maxAttempts > 0) {
          console.log(
            `⚠️ Port ${attemptPort} is already in use, trying port ${attemptPort + 1
            }...`
          );
          server.close();
          startWithPortFallback(attemptPort + 1, maxAttempts - 1);
        } else {
          console.error("❌ Server error:", err);
          process.exit(1);
        }
      });
    };

    startWithPortFallback(port);
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  console.log("👋 Shutting down CSEC ASTU Portal API gracefully...");
  smtpService.stopMonitoring();
  await prisma.$disconnect();
  console.log("🛢️ Database connection closed");
  process.exit(0);
});
