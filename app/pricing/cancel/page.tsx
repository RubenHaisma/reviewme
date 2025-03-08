'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-muted-foreground">
            Your subscription was not processed. No charges were made.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push('/pricing')}
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}