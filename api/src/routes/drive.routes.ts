import { Router } from 'express';
import upload from '../config/multer';
import driveController from '../controllers/drive.controller';

const router = Router();

/**
 * POST /api/drive/upload
 * Receives a multipart/form-data file field named `file` and uploads it to Google Drive.
 */
router.post('/upload', upload.single('file'), driveController.uploadToDrive);

export default router;
