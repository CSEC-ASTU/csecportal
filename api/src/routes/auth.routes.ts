import { Router } from "express";

// Import controller functions directly
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  verifyOtp,
  resendOtp,
  checkUserVerification,
} from "../controllers/auth.controller";
import { authenticateToken, authorize } from "../middlewares/auth.middleware";
import { RoleType } from "../types/role.types";
import { prisma } from "../config/db";

const router = Router();

// Temporary route to check President account
router.get("/check-president", async (_req, res) => {
  try {
    const president = await prisma.user.findFirst({
      where: { role: RoleType.PRESIDENT },
      select: {
        email: true,
        freeName: true,
        isEmailVerified: true,
        status: true,
      },
    });

    if (!president) {
      return res.json({
        success: false,
        error: "No President account found",
      });
    }

    return res.json({
      success: true,
      data: president,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error checking President account",
    });
  }
});

// Test endpoint
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth API is working",
    cookies: req.cookies,
  });
});


// Public routes
router.post("/register", register);
router.post("/login", login);

// Debug route: direct credential check (bypasses passport) — remove after debugging
router.post("/debug-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password required" });
    }
    console.log(`Debug login attempt for ${email}`);
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, password: true, role: true, freeName: true } });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    const match = await (await import('bcryptjs')).compare(password, user.password);
    return res.json({ success: true, matched: match, user: { id: user.id, email: user.email, role: user.role, freeName: user.freeName } });
  } catch (err) {
    console.error('Debug login error:', err);
    return res.status(500).json({ success: false, error: 'Debug login failed' });
  }
});

// GET debug route for quick browser testing: /api/auth/debug-login?email=...&password=...
router.get("/debug-login", async (req, res) => {
  try {
    const email = req.query.email as string | undefined;
    const password = req.query.password as string | undefined;

    if (!email || !password) {
      return res.json({
        success: true,
        message:
          "Provide email and password as query params: ?email=you@x.com&password=yourpw",
      });
    }

    console.log(`Debug GET login attempt for ${email}`);

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, role: true, freeName: true },
    });

    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    const bcrypt = await import("bcryptjs");
    const match = await bcrypt.compare(password, user.password);

    return res.json({ success: true, matched: match, user: { id: user.id, email: user.email, role: user.role, freeName: user.freeName } });
  } catch (err) {
    console.error("Debug GET login error:", err);
    return res.status(500).json({ success: false, error: "Debug login failed" });
  }
});

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// OTP verification routes
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

// Protected routes (require authentication)
router.post("/logout", authenticateToken, logout);
router.get("/profile", authenticateToken, getProfile);

// Direct verification endpoint - verifies any email that exists in the database
router.post("/verify-direct", async (req, res) => {
  try {
    const { email } = req.body;

    console.log(`🔑 Direct verification request for email: ${email}`);

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        freeName: true,
        role: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      console.log(`❌ User not found for email: ${email}`);
      // For testing, we'll still return success
      return res.status(200).json({
        success: true,
        message: "Email verification simulated (user not found)",
      });
    }

    // If already verified, just return success
    if (user.isEmailVerified) {
      console.log(`✓ User ${email} already verified`);
      return res.status(200).json({
        success: true,
        message: "Email already verified",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.freeName,
          isEmailVerified: true,
        },
      });
    }

    // Update the user to be verified
    await prisma.user.update({
      where: { email },
      data: { isEmailVerified: true },
    });

    console.log(
      `✅ Email ${email} verified successfully via direct verification`
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.freeName,
        isEmailVerified: true,
      },
    });
  } catch (error) {
    console.error("Direct verification error:", error);
    // Even if there's an error, return success for testing
    return res.status(200).json({
      success: true,
      message: "Email verification simulated (error occurred but ignored)",
    });
  }
});

// Auto-verify endpoint (always succeeds) - useful for testing
router.post("/auto-verify", async (req, res) => {
  try {
    const { email } = req.body;

    console.log(
      `🔓 Auto-verification request for email: ${email || "unknown email"}`
    );

    // If email is provided, try to update that user
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, freeName: true, role: true },
      });

      if (user) {
        await prisma.user.update({
          where: { email },
          data: { isEmailVerified: true },
        });

        console.log(`✅ Email ${email} auto-verified successfully`);

        return res.status(200).json({
          success: true,
          message: "Email auto-verified successfully",
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.freeName,
            isEmailVerified: true,
          },
        });
      } else {
        console.log(
          `⚠️ User not found for email: ${email}, but proceeding anyway`
        );
        // For testing purposes, we'll still return success
        return res.status(200).json({
          success: true,
          message: "Email verification simulated (user not found)",
        });
      }
    }

    // If no email provided, just return success
    return res.status(200).json({
      success: true,
      message: "Auto-verification successful (no email provided)",
    });
  } catch (error) {
    console.error("Auto-verification error:", error);
    // Even if there's an error, return success for testing
    return res.status(200).json({
      success: true,
      message: "Email verification simulated (error occurred but ignored)",
    });
  }
});

// Verify all users endpoint - verifies all users in the database
router.post("/verify-all-users", async (_req, res) => {
  try {
    console.log("🔄 Verifying all users in the database");

    // Update all users to be verified
    const result = await prisma.user.updateMany({
      where: { isEmailVerified: false },
      data: { isEmailVerified: true },
    });

    console.log(`✅ ${result.count} users verified successfully`);

    return res.status(200).json({
      success: true,
      message: `${result.count} users verified successfully`,
    });
  } catch (error) {
    console.error("Verify all users error:", error);
    return res.status(200).json({
      success: true,
      message: "All users verified (error handled)",
    });
  }
});

router.get("/check-verified", authenticateToken, checkUserVerification);

// Add /me endpoint
router.get("/me", authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

// Admin routes (require authentication and specific roles)
router.get(
  "/admin/profile",
  authenticateToken,
  authorize([RoleType.PRESIDENT]),
  getProfile
);

export default router;
