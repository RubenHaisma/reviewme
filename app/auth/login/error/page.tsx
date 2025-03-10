'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Navigation } from '@/components/layout/navigation';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function LoginError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Map error codes to user-friendly messages
  const errorMessage = (() => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'EmailSignin':
        return 'We couldn’t send your login email. Please try again later.';
      case 'OAuthSignin':
        return 'There was an issue signing in with your OAuth provider. Please try another method.';
      case 'OAuthCallback':
        return 'An error occurred during OAuth authentication. Please try again.';
      case 'Verification':
        return 'The verification link is invalid or has expired. Request a new one.';
      default:
        return error ? 'An unexpected error occurred during sign-in. Please try again.' : null;
    }
  })();

  // If no error, return null
  if (!errorMessage) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background flex flex-col">
      {/* Navigation Component */}
      <Navigation isAuthenticated={false} />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-4 max-w-md w-full mx-auto"
        >
          <Alert variant="destructive" className="shadow-md">
            <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-destructive-foreground">
              {errorMessage}
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    </div>
  );
}