'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface ServiceStatus {
  api?: string;
  database?: string;
  email?: string;
  stripe?: string;
  [key: string]: string | undefined;
}

interface StatusResponse {
  status: string;
  updated_at: string;
  services: ServiceStatus;
}

export default function StatusPage() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/status');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Debug: Log the response
        setStatus(data);
      } catch (error) {
        console.error('Error fetching status:', error);
        setError('Failed to load system status. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isAuthenticated={false} />

      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background pt-32 pb-20"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-3xl mx-auto" variants={fadeInUp}>
            <motion.h1
              className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-6"
              variants={fadeInUp}
            >
              System Status
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground" variants={fadeInUp}>
              Real-time updates on Raatum.com service performance.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <motion.div
                className="text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Checking system status...
              </motion.div>
            ) : error ? (
              <motion.div
                className="text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            ) : status ? (
              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                key={status.updated_at} // Force re-render on data change
              >
                {/* Overall Status */}
                <motion.div variants={fadeInUp}>
                  <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary">Overall System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          variant={status.status.toLowerCase() === 'operational' ? 'default' : 'destructive'}
                          className="capitalize"
                        >
                          {status.status}
                        </Badge>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status.status)}
                          <span className="text-sm font-medium capitalize">{status.status}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {new Date(status.updated_at).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Service Details */}
                {status.services && Object.keys(status.services).length > 0 ? (
                  <motion.div
                    className="grid gap-4 sm:grid-cols-2"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {Object.entries(status.services).map(([service, serviceStatus]) => (
                      <motion.div key={service} variants={fadeInUp}>
                        <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium capitalize text-foreground">{service}</h3>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {serviceStatus || 'Unknown'}
                                </p>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {getStatusIcon(serviceStatus || 'unknown')}
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center text-muted-foreground"
                    variants={fadeInUp}
                  >
                    No service status details available.
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                className="text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Unable to retrieve system status at this time. Please try again later.
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}