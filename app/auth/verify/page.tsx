'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setErrorMessage('Invalid or missing token');
      setIsVerifying(false);
      return;
    }

    async function verifyEmail() {
      try {
        const response = await fetch(`/api/auth/verify?token=${token}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        toast.success('Email verified successfully!');
        router.push('/auth/login');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to verify email';
        setErrorMessage(message);
        toast.error(message);
        setIsVerifying(false);
      }
    }

    verifyEmail();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        {isVerifying ? (
          <p className="text-muted-foreground">Verifying your email address...</p>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {errorMessage || 'There was a problem verifying your email address.'}
            </p>
            <Button onClick={() => router.push('/auth/login')}>
              Return to Login
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
            <p className="text-muted-foreground">Loading verification...</p>
          </Card>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}