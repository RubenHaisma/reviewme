'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    if (!session_id) {
      router.push('/pricing');
    }
  }, [session_id, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Thank You!</h1>
          <p className="text-muted-foreground">
            Your subscription has been activated successfully.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            Go to Dashboard
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/billing')}
            className="w-full"
          >
            View Billing Details
          </Button>
        </div>
      </Card>
    </div>
  );
}