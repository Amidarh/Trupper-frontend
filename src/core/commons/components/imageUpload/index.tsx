'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  error?: string | null;
  disabled?: boolean;
  placeholder?: string
}

export default function ImageUpload({ value, onChange, error, disabled, placeholder }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url); // Cleanup
    } else if (typeof value === 'string') {
      setPreviewUrl(value); // Use the string URL directly
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row-reverse gap-2 items-center">
        {!previewUrl && <div
          className="relative h-24 w-24 border rounded-sm text-center flex justify-center items-center text-muted-foreground cursor-pointer p-2"
          onClick={() => fileInputRef.current?.click()}>
            <p>{placeholder ?? "Upload Image"}</p>
          </div>}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png"
          className="hidden"
          disabled={disabled}
        />
        {previewUrl && (
          <div 
            className="relative h-24 w-24 border rounded-sm cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={previewUrl}
              alt="Selected image preview"
              width={96}
              height={96}
              className="object-contain rounded-md h-24 w-24"
              priority
            />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
