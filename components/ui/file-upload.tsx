'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';



interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string;
  onChange?: (url: string) => void;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, value, onChange, accept, ...props }, ref) => {
    const [preview, setPreview] = React.useState<string | null>(value || null);
    const [isUploading, setIsUploading] = React.useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // For demo purposes, we're just creating a temporary URL
      // In a real application, you would upload to a storage service
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(url);

      // Simulate upload delay
      setIsUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsUploading(false);
    };

    const handleRemove = () => {
      setPreview(null);
      onChange?.('');
    };

    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center gap-2">
          <Input
            ref={ref}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            {...props}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => (ref as any)?.current?.click()}
            disabled={isUploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
          {preview && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {preview && accept?.includes('image/') && (
          <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border">
            <Image
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };