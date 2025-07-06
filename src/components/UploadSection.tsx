"use client";

import { useState } from "react";

export default function UploadSection({
  onUpload,
}: {
  onUpload: (input: { type: "zip" | "url"; data: File | string }) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [repoUrl, setRepoUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onUpload({ type: "zip", data: file });
    }
  };

  const handleUrlSubmit = () => {
    if (repoUrl.trim().startsWith("https://github.com")) {
      onUpload({ type: "url", data: repoUrl });
    } else {
      alert("Enter a valid GitHub URL");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">📁 Upload GitHub Repo</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Upload ZIP</label>
        <input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
        {selectedFile && (
          <p className="text-sm text-green-600 mt-1">
            ✅ {selectedFile.name} selected
          </p>
        )}
      </div>

      <div className="mb-2">
        <label className="block font-medium mb-1">
          or Enter GitHub Repo URL
        </label>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/user/repo"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <button
        onClick={handleUrlSubmit}
        className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
        Fetch from GitHub
      </button>
    </div>
  );
}
