import cloudinary from "../config/cloudinary-config";
import { Express } from "express";

/**
 * Upload a profile picture to Cloudinary
 * @param fileBuffer - Buffer or string to upload
 * @param userId - User ID for folder organization
 * @returns URL of uploaded image
 */
export const uploadProfilePicture = async (
  fileBuffer: Buffer | string,
  userId: string
): Promise<string> => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `csec-portal/profile-pictures/${userId}`,
          public_id: "profile",
          overwrite: true,
          resource_type: "auto",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url || "");
        }
      );

      // If fileBuffer is a Buffer, use stream
      if (Buffer.isBuffer(fileBuffer)) {
        uploadStream.end(fileBuffer);
      } else {
        // If it's a string (base64 or URL), end with the string
        uploadStream.end(fileBuffer);
      }
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

/**
 * Delete a profile picture from Cloudinary
 * @param userId - User ID to delete profile picture for
 */
export const deleteProfilePicture = async (userId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(`csec-portal/profile-pictures/${userId}/profile`);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    // Don't throw - silently fail if deletion doesn't work
  }
};

/**
 * Get Cloudinary upload signature for client-side uploads (optional for direct client uploads)
 */
export const getCloudinarySignature = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "csec-portal/profile-pictures",
    },
    process.env.CLOUDINARY_API_SECRET || ""
  );

  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
};
