'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function LoginError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = '';
  switch (error) {
    case 'CredentialsSignin':
      errorMessage = 'Invalid email or password';
      break;
    case 'EmailSignin':
      errorMessage = 'Error sending login email';
      break;
    case 'OAuthSignin':
      errorMessage = 'Error signing in with OAuth provider';
      break;
    case 'OAuthCallback':
      errorMessage = 'Error during OAuth callback';
      break;
    case 'Verification':
      errorMessage = 'The verification link is invalid or has expired';
      break;
    default:
      errorMessage = 'An error occurred during sign in';
  }

  if (!error) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}