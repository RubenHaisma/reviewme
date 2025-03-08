'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ServiceStatus {
  api: string;
  database: string;
  email: string;
  stripe: string;
}

interface StatusResponse {
  status: string;
  updated_at: string;
  services: ServiceStatus;
}

export default function StatusPage() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">System Status</h1>
            
            {loading ? (
              <div className="text-center">Loading status...</div>
            ) : status ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">System Status</h2>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status.status)}
                      <span className="capitalize">{status.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(status.updated_at).toLocaleString()}
                  </p>
                </Card>

                <div className="grid gap-4">
                  {Object.entries(status.services).map(([service, serviceStatus]) => (
                    <Card key={service} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium capitalize">{service}</h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {serviceStatus}
                          </p>
                        </div>
                        {getStatusIcon(serviceStatus)}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Unable to fetch system status
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}