import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Load environment variables
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 * @param filePath Local path to the file
 * @param folder Optional folder name for organization in Cloudinary
 */
export const uploadToCloudinary = async (filePath: string, folder = 'uploads'): Promise<any> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `csec-portal/${folder}`,
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
      quality: 'auto',
      fetch_format: 'auto',
    });

    // Remove the local file after successful upload
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      console.warn('Could not delete local file:', filePath);
    }

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      url: result.url,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // Try to remove local file on error
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      /* ignore */
    }
    throw error;
  }
};

/**
 * Upload a buffer (from multer memory storage) directly to Cloudinary
 * @param buffer File buffer from multer
 * @param fileName Name for the file
 * @param folder Optional folder name for organization
 */
export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  fileName: string,
  folder = 'uploads'
): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `csec-portal/${folder}`,
          resource_type: 'auto',
          public_id: fileName.split('.')[0],
          use_filename: true,
          unique_filename: true,
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              secure_url: result?.secure_url || '',
              public_id: result?.public_id || '',
              url: result?.url || '',
              width: result?.width || 0,
              height: result?.height || 0,
              format: result?.format || '',
            });
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Cloudinary buffer upload error:', error);
    throw error;
  }
};

/**
 * Delete a file from Cloudinary by public_id
 * @param publicId The public ID of the file to delete
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    // Don't throw - silently fail if deletion doesn't work
  }
};

/**
 * Minimal default export with `.uploader.upload` and `.uploader.destroy` to preserve existing usages.
 */
const cloudinaryWrapper = {
  uploader: {
    upload: async (filePath: string, options?: any) => {
      return await uploadToCloudinary(filePath, options?.folder || 'uploads');
    },
    destroy: async (publicId: string) => {
      return await deleteFromCloudinary(publicId);
    }
  }
};

export default cloudinaryWrapper;
