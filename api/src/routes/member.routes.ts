import express, { Request } from "express";
import memberController from "../controllers/member.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { RequestWithUser } from "../types/request.types";
import path from "path";
import fs from "fs";
import { upload, uploadProfilePic } from "../config/multer";
import { uploadBufferToCloudinary } from "../config/cloudinary";
import { prisma } from "../config/db";
import { successResponse, errorResponse } from "../utils/response";

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Get all members - accessible by president and division heads
router.get("/", memberController.getAllMembers);

// Get all users with advanced filtering, search, and pagination
router.get("/users", memberController.getAllUsers);
router.get("/verified", memberController.getVerifiedUsers);

// Create a new member - accessible by president and division heads
router.post("/", memberController.createMember);

// Get all division heads - accessible by president only
router.get("/division-heads", memberController.getDivisionHeads);

// Simplified member invitation - accessible by president and division heads
router.post("/invite", memberController.inviteMember);

// Generate a random password - accessible by anyone
router.get("/generate-password", memberController.generatePassword);

// Update own profile - accessible by any authenticated user
// Must be declared BEFORE /:memberId to avoid route capture
router.patch(
  "/profile",
  authenticateToken,
  upload.single("profileImage"),
  memberController.updateOwnProfile
);

// Assign division head - accessible by president only
router.post("/assign-head", memberController.assignDivisionHead);

// Get member by ID - accessible by president, division heads, and the member themselves
router.get("/:memberId", memberController.getMemberById);

// Update member - accessible by president, division heads (their division only), and members (own profile)
router.patch("/:memberId", memberController.updateMember);

// Delete member - accessible by president and division heads (their division only)
router.delete("/:memberId", memberController.deleteMember);

// Update profile picture - accessible by the member themselves or president
router.post(
  "/update-profile-picture/:memberId",
  authenticateToken,
  uploadProfilePic.single("profilepic"),
  async (req: any, res) => {
    try {
      const reqUser = req as RequestWithUser;
      const { memberId } = req.params;
      const userId = reqUser.user?.id;

      // Validate memberId
      if (!memberId) {
        return res.status(400).json(errorResponse("Member ID is required"));
      }

      // Check authorization
      if (userId !== memberId && !reqUser.user?.roles?.includes("PRESIDENT" as any)) {
        return res.status(403).json(errorResponse("Unauthorized"));
      }

      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json(errorResponse("No profile picture uploaded"));
      }

      // Upload to Cloudinary
      const cloudinaryResult = await uploadBufferToCloudinary(
        req.file.buffer,
        req.file.originalname,
        "profile-pictures"
      );

      // Update the member's profile picture URL in the database
      const updatedMember = await prisma.user.update({
        where: { id: memberId },
        data: { profileImage: cloudinaryResult.secure_url },
        select: {
          id: true,
          freeName: true,
          email: true,
          profileImage: true,
        },
      });

      return res.json(
        successResponse(updatedMember, "Profile picture updated successfully")
      );
    } catch (error) {
      console.error("Update profile picture error:", error);
      return res.status(500).json(errorResponse("Failed to update profile picture"));
    }
  }
);

// Simple profile picture update endpoint that uses Cloudinary - no authentication required
router.post(
  "/simple-profile-picture/:memberId",
  uploadProfilePic.single("profilepicture"),
  async (req: Request, res) => {
    try {
      const { memberId } = req.params;

      // Validate memberId format
      if (!memberId) {
        return res.status(400).json(errorResponse("Member ID is required"));
      }

      // Check if member exists
      const existingMember = await prisma.user.findUnique({
        where: { id: memberId },
      });

      if (!existingMember) {
        return res.status(404).json(errorResponse("Member not found"));
      }

      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json(errorResponse("No profile picture uploaded"));
      }

      // Upload to Cloudinary
      const cloudinaryResult = await uploadBufferToCloudinary(
        req.file.buffer,
        req.file.originalname,
        "profile-pictures"
      );

      // Update the member's profile picture URL in the database
      const updatedMember = await prisma.user.update({
        where: { id: memberId },
        data: { profileImage: cloudinaryResult.secure_url },
        select: {
          id: true,
          freeName: true,
          email: true,
          profileImage: true,
        },
      });

      return res.json(
        successResponse(updatedMember, "Profile picture updated successfully")
      );
    } catch (error) {
      console.error("Simple profile picture update error:", error);
      return res.status(500).json(errorResponse("Failed to update profile picture"));
    }
  }
);

// Remove division head - accessible by president only
router.post("/remove-head", memberController.removeDivisionHead);

// Create a completely separate route for bulk operations to avoid any conflicts
// This route is outside the pattern that might be caught by the :memberId parameter handler
router.post(
  "/admin/bulk-operations/remove-all-except-president",
  memberController.removeAllMembersExceptPresident
);

export default router;
