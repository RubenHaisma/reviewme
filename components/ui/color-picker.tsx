'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ColorPickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  color?: string;
  onChange?: (color: string) => void;
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ className, color, onChange, ...props }, ref) => {
    const [value, setValue] = React.useState(color || '#000000');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setValue(newColor);
      onChange?.(newColor);
    };

    return (
      <div className="flex items-center gap-2">
        <div
          className="h-10 w-10 rounded-md border"
          style={{ backgroundColor: value }}
        />
        <Input
          ref={ref}
          type="color"
          value={value}
          onChange={handleChange}
          className={cn(
            'h-10 w-full cursor-pointer appearance-none border-none bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };