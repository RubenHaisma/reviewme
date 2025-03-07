'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string;
  onChange?: (url: string) => void;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, value, onChange, accept, ...props }, ref) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string | null>(value || null);
    const [isUploading, setIsUploading] = React.useState(false);

    React.useEffect(() => {
      setPreview(value || null);
    }, [value]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      try {
        // Convert the file to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setPreview(base64String);
          onChange?.(base64String);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error processing file:', error);
        setIsUploading(false);
      }
    };

    const handleRemove = () => {
      setPreview(null);
      onChange?.('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            {...props}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
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
          <div className="relative h-20 w-full max-w-sm overflow-hidden rounded-lg border">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };