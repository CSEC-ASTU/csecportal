Google Drive Upload Integration
================================

This project has been extended to upload files from the Next.js frontend to Google Drive via the Express backend.

Overview
- Frontend: Next.js (App Router) page at `client/app/upload/page.tsx` lets users pick a file and sends it to the backend.
- Backend: Express (existing API in `api/`) now exposes `POST /api/drive/upload` which accepts multipart `file` and uploads it to Google Drive using a service account.

Required environment variables (set in `api/.env`):

Service account mode (existing):
- `GOOGLE_DRIVE_CLIENT_EMAIL` — the service account client email.
- `GOOGLE_DRIVE_PRIVATE_KEY` — the private key from the service account JSON. Preserve newlines (use `\n` in single-line .env files).

OAuth2 user-account mode (preferred when using a regular Google account):
- `GOOGLE_DRIVE_OAUTH_CLIENT_ID` or `GOOGLE_DRIVE_CLIENT_ID` — OAuth2 client ID from Google Cloud OAuth credentials.
- `GOOGLE_DRIVE_OAUTH_CLIENT_SECRET` or `GOOGLE_DRIVE_CLIENT_SECRET` — OAuth2 client secret.
- `GOOGLE_DRIVE_REFRESH_TOKEN` — a refresh token for the account that will own uploads. The server will exchange it for access tokens automatically.

- `GOOGLE_DRIVE_FOLDER_ID` — the Drive folder ID where files will be uploaded.
- `EXPRESS_PORT` — optional, default 5500.

How to set up Google Cloud & service account
1. Create or select a Google Cloud project at https://console.cloud.google.com/
2. Enable the Google Drive API for that project:
   - API Library → search "Google Drive API" → Enable
3. Create a service account:
   - IAM & Admin → Service Accounts → Create Service Account
   - Give it a name (e.g., `drive-uploader`) and Finish.
4. Create a JSON key for the service account:
   - Click the service account → Keys → Add Key → Create new key → JSON → Download.
5. From the JSON, copy `client_email` → set to `GOOGLE_DRIVE_CLIENT_EMAIL` in `.env`.
6. Copy the `private_key` into `GOOGLE_DRIVE_PRIVATE_KEY` in `.env`.
   - If your `.env` file is a single-line value, replace real newlines with `\n` (the server code will convert them back).

Alternative: OAuth2 refresh token flow
1. In Google Cloud Console create OAuth2 credentials (OAuth Client ID) for a "Desktop" or "Web application" and copy the client ID and secret.
2. Obtain a refresh token by running a small OAuth flow (e.g., using `googleapis` quickstart or `oauth2l`) and authorize the account that will own uploads.
3. Set `GOOGLE_DRIVE_OAUTH_CLIENT_ID`, `GOOGLE_DRIVE_OAUTH_CLIENT_SECRET`, and `GOOGLE_DRIVE_REFRESH_TOKEN` in `api/.env`.
4. When those OAuth env vars are present the server will use them instead of the service account.
7. Create a folder in Google Drive where uploaded files will live. Obtain the folder ID from the URL `https://drive.google.com/drive/folders/<FOLDER_ID>` and set as `GOOGLE_DRIVE_FOLDER_ID`.

Important: If you want files to be publicly viewable via the returned link, the server sets a permission `anyone with link` reader on each file. Ensure your organization's policies allow that.

Running the project locally
1. Install dependencies for server and client:

```bash
cd api
npm install

cd ../client
npm install
```

2. Create `api/.env` (copy from `api/.env.example`) and fill in the values.

3. Start both servers in separate terminals:

Terminal A — Express API
```bash
cd api
npm run dev
```

Terminal B — Next.js frontend
```bash
cd client
npm run dev
```

Alternatively, run both using `concurrently` from repository root (install it first):

```bash
npm i -g concurrently
concurrently "(cd api && npm run dev)" "(cd client && npm run dev)"
```

How to use
1. Open the Next.js upload page: http://localhost:3000/upload
2. Choose a file and click Upload.
3. The page will display a link to open the uploaded file in Google Drive.

Notes & compatibility
- The existing backend code calls `uploadToCloudinary` in many places. The previous Cloudinary adapter has been replaced with a Google Drive adapter that preserves the same function name and returns an object `{ secure_url, public_id }` where `secure_url` is the Drive file link and `public_id` is the Drive file ID.
- Deleting files through the old `destroy(public_id)` adapter will delete Drive files by ID.

If you want help testing the upload end-to-end, I can run quick checks or add a sample e2e test.
