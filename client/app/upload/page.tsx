"use client";

import React, { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ id?: string; link?: string; error?: string } | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setResult({ error: 'Please choose a file first' });
    setLoading(true);
    setResult(null);

    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch(`${apiBase}/api/drive/upload`, {
        method: 'POST',
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        setResult({ error: data?.message || 'Upload failed' });
      } else {
        setResult({ id: data.data?.id, link: data.data?.link });
      }
    } catch (err: any) {
      setResult({ error: err.message || 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Upload File to Google Drive</h2>
      <input type="file" onChange={handleFileChange} />
      <div style={{ marginTop: 12 }}>
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {result?.error && <p style={{ color: 'red' }}>{result.error}</p>}
      {result?.link && (
        <p>
          Uploaded: <a href={result.link} target="_blank" rel="noreferrer">Open file</a> (ID: {result.id})
        </p>
      )}
    </div>
  );
}
