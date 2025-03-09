'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginError from '@/app/auth/login/error/page';
import { Lock, Mail } from 'lucide-react';

// Animation variants
const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };
const staggerContainer = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { staggerChildren: 0.2 } } };

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  async function onEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success('Check your email for the login link!');
      // Optionally redirect after a delay to allow user to see the toast
      setTimeout(() => router.push('/auth/login'), 2000);
    } catch (error) {
      console.error('Email Login Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function onCredentialsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
  
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
  
      if (result?.error) {
        throw new Error('Invalid credentials');
      }
  
      if (result?.url) {
        toast.success('Signed in successfully!');
        router.push(result.url);
      }
    } catch (error) {
      console.error('Credentials Login Error:', error);
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div className="w-full max-w-md space-y-8 p-8 bg-background rounded-lg shadow-lg border" variants={staggerContainer} initial="initial" animate="animate">
        <motion.div className="text-center" variants={fadeInUp}>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your Raatum account</p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <LoginError />
        </motion.div>

        <Tabs defaultValue="email" className="w-full">
          <motion.div variants={fadeInUp}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email" className="flex items-center gap-2"><Mail className="h-4 w-4" /> Magic Link</TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2"><Lock className="h-4 w-4" /> Password</TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="email">
            <motion.form onSubmit={onEmailSubmit} className="space-y-6" variants={staggerContainer} initial="initial" animate="animate">
              <motion.div variants={fadeInUp}>
                <Label htmlFor="email-magic" className="text-foreground">Email</Label>
                <Input id="email-magic" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="mt-1 border-muted focus:ring-primary focus:border-primary" />
              </motion.div>
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-semibold py-3 shadow-md" disabled={isLoading}>
                  {isLoading ? 'Sending Link...' : 'Send Magic Link'}
                </Button>
              </motion.div>
            </motion.form>
          </TabsContent>

          <TabsContent value="password">
            <motion.form onSubmit={onCredentialsSubmit} className="space-y-6" variants={staggerContainer} initial="initial" animate="animate">
              <motion.div variants={fadeInUp}>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="mt-1 border-muted focus:ring-primary focus:border-primary" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••" className="mt-1 border-muted focus:ring-primary focus:border-primary" />
              </motion.div>
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-semibold py-3 shadow-md" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </motion.div>
            </motion.form>
          </TabsContent>
        </Tabs>

        <motion.p className="text-center text-sm text-muted-foreground" variants={fadeInUp}>
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-medium text-primary hover:underline">Sign up</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}