'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

interface ImageUploadProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  error?: string | null;
  disabled?: boolean;
}

export default function ImageUploadTwo({
  value,
  onChange,
  error,
  disabled,
}: ImageUploadProps) {
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
    <div className='flex flex-col items-start w-full'>
      <div className='flex flex-row items-center gap-2 mb-2'>
        <Label className='mb-2'>Image</Label>
        <Button
          type='button'
          disabled={disabled}
          variant='outline'
          onClick={() => fileInputRef.current?.click()}
        >
          Choose Image
        </Button>
      </div>

      <div className='flex flex-row-reverse gap-2 items-center w-full'>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='image/jpeg,image/png'
          className='hidden'
        />
        {previewUrl && (
          <div className='relative h-[185px] w-full border rounded-sm overflow-hidden'>
            <Image
              src={previewUrl}
              alt='Selected image preview'
              className='object-contain rounded-md'
              fill
              priority
            />
          </div>
        )}
      </div>
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
    </div>
  );
}
