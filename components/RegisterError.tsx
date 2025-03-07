'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface RegisterErrorProps {
  error?: string;
}

export default function RegisterError({ error }: RegisterErrorProps) {
  if (!error) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}