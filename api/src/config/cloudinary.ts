import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
// Import `googleapis` at runtime to avoid TypeScript module resolution errors
// if the package has not yet been installed. The code will throw a clear error
// asking the developer to install it when required.

// Load environment variables
dotenv.config();

// Helper to get private key with proper newlines
const getPrivateKey = () => {
  const key = process.env.GOOGLE_DRIVE_PRIVATE_KEY || '';
  return key.includes('-----BEGIN') ? key : key.replace(/\\n/g, '\n');
};

// Create an auth client. Supports two modes:
// 1) OAuth2 with refresh token (preferred when using a user account):
//    - GOOGLE_DRIVE_OAUTH_CLIENT_ID (or GOOGLE_DRIVE_CLIENT_ID)
//    - GOOGLE_DRIVE_OAUTH_CLIENT_SECRET (or GOOGLE_DRIVE_CLIENT_SECRET)
//    - GOOGLE_DRIVE_REFRESH_TOKEN
// 2) Service account JWT (legacy/alternative):
//    - GOOGLE_DRIVE_CLIENT_EMAIL
//    - GOOGLE_DRIVE_PRIVATE_KEY
const getAuthClient = () => {
  const oauthClientId = process.env.GOOGLE_DRIVE_OAUTH_CLIENT_ID || process.env.GOOGLE_DRIVE_CLIENT_ID;
  const oauthClientSecret = process.env.GOOGLE_DRIVE_OAUTH_CLIENT_SECRET || process.env.GOOGLE_DRIVE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

  // Load googleapis at runtime and provide a helpful error if missing
  let google: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    google = require('googleapis').google;
  } catch (err) {
    throw new Error("Missing dependency 'googleapis'. Run 'pnpm install googleapis' or 'npm install googleapis'");
  }

  // Prefer OAuth2 flow if refresh token and client credentials are provided
  if (refreshToken && oauthClientId && oauthClientSecret) {
    const oAuth2Client = new google.auth.OAuth2(oauthClientId, oauthClientSecret);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });
    // Non-sensitive runtime log to aid debugging (do not print secrets)
    // This helps verify the server chose OAuth2 instead of the service account.
    console.info('Google Drive auth: using OAuth2 refresh token');
    return oAuth2Client;
  }

  // Fallback to service account JWT
  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!clientEmail || !privateKey) {
    throw new Error('Google Drive service account credentials are not set in environment variables and no OAuth2 refresh token found');
  }

  // If `GOOGLE_DRIVE_IMPERSONATE_USER` is set, the JWT will impersonate that
  // user (requires domain-wide delegation to be enabled for the service account).
  console.info('Google Drive auth: using service account JWT (GOOGLE_DRIVE_CLIENT_EMAIL)');
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/drive'],
    subject: process.env.GOOGLE_DRIVE_IMPERSONATE_USER || undefined
  });
};

// Helper to load googleapis.google at runtime
const getGoogle = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('googleapis').google;
  } catch (err) {
    throw new Error("Missing dependency 'googleapis'. Run 'pnpm install googleapis' or 'npm install googleapis'");
  }
};

/**
 * Upload a file to Google Drive and return an object compatible with existing Cloudinary usage.
 * This keeps existing controller code working while storing files in Google Drive.
 * @param filePath Local path to the file
 * @param _folder Optional folder name (ignored; Drive uses folder ID from env)
 */
export const uploadToCloudinary = async (filePath: string, _folder = 'uploads'): Promise<any> => {
  const auth = getAuthClient();
  const google = getGoogle();
  const drive = google.drive({ version: 'v3', auth });

  // Ensure GOOGLE_DRIVE_FOLDER_ID is set
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID is not set in environment variables');
  }

  // Prepare file metadata and media
  const fileName = path.basename(filePath);
  const detectedMime = mime.lookup(filePath) || 'application/octet-stream';
  const media = {
    mimeType: detectedMime,
    body: fs.createReadStream(filePath),
  } as any;

  try {
    if (typeof (auth as any).authorize === 'function') {
      await (auth as any).authorize();
    } else if (typeof (auth as any).getAccessToken === 'function') {
      // OAuth2 client: ensure we have a valid access token (this will use the refresh token)
      await (auth as any).getAccessToken();
    }

    // Create the file in the target folder (support Shared Drives)
    const createRes = await drive.files.create({
      supportsAllDrives: true,
      resource: {
        name: fileName,
        parents: [folderId]
      },
      media,
      fields: 'id,name'
    });

    const fileId = createRes.data.id as string;

    // Make the file publicly readable (anyone with link)
    await drive.permissions.create({
      fileId,
      supportsAllDrives: true,
      resource: {
        role: 'reader',
        type: 'anyone'
      }
    });

    // Retrieve a webViewLink for the uploaded file
    const getRes = await drive.files.get({ fileId, supportsAllDrives: true, includeItemsFromAllDrives: true, fields: 'webViewLink,webContentLink' });
    const webViewLink = (getRes.data.webViewLink as string) || `https://drive.google.com/file/d/${fileId}/view`;

    // Remove the local file after successful upload
    try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }

    // Return an object with fields similar to Cloudinary's response
    return {
      secure_url: webViewLink,
      public_id: fileId
    };
  } catch (error) {
    // Try to remove local file on error
    try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
    console.error('Google Drive upload error:', error);
    throw error;
  }
};

/**
 * Minimal default export with `.uploader.upload` and `.uploader.destroy` to preserve existing usages.
 */
export default {
  uploader: {
    // Wrapper to mimic Cloudinary uploader.upload
    upload: async (filePath: string, options?: any) => {
      return await uploadToCloudinary(filePath, options?.folder || 'uploads');
    },
    // Delete a file by its Drive fileId (public_id)
    destroy: async (publicId: string) => {
      try {
          const auth = getAuthClient();
          const google = getGoogle();
          const drive = google.drive({ version: 'v3', auth });
          if (typeof (auth as any).authorize === 'function') {
            await (auth as any).authorize();
          } else if (typeof (auth as any).getAccessToken === 'function') {
            await (auth as any).getAccessToken();
          }
          await drive.files.delete({ fileId: publicId, supportsAllDrives: true, includeItemsFromAllDrives: true });
          return { result: 'deleted' };
      } catch (error) {
        console.error('Google Drive delete error:', error);
        throw error;
      }
    }
  }
};
