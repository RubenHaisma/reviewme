'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'error';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      className={cn(
        'capitalize',
        {
          'bg-green-100 text-green-800': status === 'active',
          'bg-gray-100 text-gray-800': status === 'inactive',
          'bg-red-100 text-red-800': status === 'error',
        },
        className
      )}
    >
      {status}
    </Badge>
  );
}