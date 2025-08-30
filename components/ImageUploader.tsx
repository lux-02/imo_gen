
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File, base64: string) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(async (files: FileList | null) => {
    setError(null);
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a PNG, JPG, or WEBP image.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) { // 4MB limit
      setError('File is too large. Please upload an image under 4MB.');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      onImageUpload(file, base64);
    } catch (err) {
      setError('Failed to read the image file.');
    }
  }, [onImageUpload]);

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-lg border-2 border-dashed border-slate-600 hover:border-cyan-500 transition-colors">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="text-cyan-400 mb-4">
          <UploadIcon />
        </div>
        <h2 className="text-xl font-semibold mb-2">Upload Reference Image</h2>
        <p className="text-slate-400 text-center">Drag & drop your character image here, or click to browse.</p>
        <p className="text-sm text-slate-500 mt-2">PNG with transparent background is recommended (Max 4MB).</p>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </label>
      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
    </div>
  );
};
