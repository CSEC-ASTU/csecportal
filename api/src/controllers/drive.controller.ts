import { Request, Response } from 'express';
import { uploadToCloudinary } from '../config/cloudinary';
import { successResponse, errorResponse } from '../utils/response';

/**
 * Controller to handle file upload to Google Drive.
 * Expects `req.file` from multer middleware.
 */
export const uploadToDrive = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file uploaded'));
    }

    // Upload the file using the adapter (keeps existing import names)
    const result = await uploadToCloudinary(req.file.path, 'uploads');

    return res.json(
      successResponse(
        {
          id: result.public_id,
          link: result.secure_url,
        },
        'File uploaded successfully'
      )
    );
  } catch (error: any) {
    console.error('Drive upload error:', error);
    return res.status(500).json(errorResponse(error.message || 'Failed to upload file'));
  }
};

export default {
  uploadToDrive,
};
