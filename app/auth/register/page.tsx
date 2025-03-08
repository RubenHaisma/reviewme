'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form'; // Add Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import isURL from 'validator/lib/isURL';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Lock } from 'lucide-react';
import RegisterError from '@/components/RegisterError';

// Zod schema for form validation
const registerSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyWebsite: z.string().refine((url) => !url || isURL(url), {
    message: 'Please enter a valid URL',
  }),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  acceptDataProcessing: z.boolean().refine((val) => val === true, {
    message: 'You must accept the data processing agreement',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

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
    transition: { staggerChildren: 0.2 },
  },
};

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const {
    register,
    control, // Add control for Controller
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      companyWebsite: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      acceptDataProcessing: false,
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      toast.success('Registration successful! Please check your email to verify your account.');
      router.push('/auth/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-lg space-y-8 p-8 bg-background rounded-lg shadow-lg border"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div className="text-center space-y-2" variants={fadeInUp}>
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Join Raatum
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account and start with your first 20 customers free!
          </CardDescription>
        </motion.div>

        {/* Error Display */}
        <motion.div variants={fadeInUp}>
          <RegisterError error={error} />
        </motion.div>

        {/* Registration Form */}
        <CardContent className="p-0">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Company Name */}
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="companyName" className="text-foreground">
                Company Name
              </Label>
              <Input
                id="companyName"
                {...register('companyName')}
                placeholder="e.g., Acme Inc."
                className="border-muted focus:ring-primary focus:border-primary"
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </motion.div>

            {/* Company Website */}
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="companyWebsite" className="text-foreground">
                Company Website (Optional)
              </Label>
              <Input
                id="companyWebsite"
                {...register('companyWebsite')}
                placeholder="e.g., https://example.com"
                className="border-muted focus:ring-primary focus:border-primary"
              />
              {errors.companyWebsite && (
                <p className="text-sm text-destructive">{errors.companyWebsite.message}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="border-muted focus:ring-primary focus:border-primary"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="border-muted focus:ring-primary focus:border-primary"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="••••••••"
                className="border-muted focus:ring-primary focus:border-primary"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </motion.div>

            {/* Password Requirements */}
            <motion.div variants={fadeInUp}>
              <Alert className="bg-muted border-muted">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <AlertDescription className="text-muted-foreground">
                  Password must be 8+ characters with at least one uppercase, lowercase, number, and special character.
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* Agreements */}
            <motion.div className="space-y-4" variants={fadeInUp}>
              <div className="flex items-start space-x-2">
                <Controller
                  control={control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <Checkbox
                      id="acceptTerms"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === 'indeterminate' ? false : checked)}
                    />
                  )}
                />
                <Label
                  htmlFor="acceptTerms"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{' '}
                  <Link href="/terms" className="text-primary hover:underline" target="_blank">
                    Terms and Conditions
                  </Link>
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
              )}

              <div className="flex items-start space-x-2">
                <Controller
                  control={control}
                  name="acceptDataProcessing"
                  render={({ field }) => (
                    <Checkbox
                      id="acceptDataProcessing"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === 'indeterminate' ? false : checked)}
                    />
                  )}
                />
                <Label
                  htmlFor="acceptDataProcessing"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{' '}
                  <Link href="/privacy" className="text-primary hover:underline" target="_blank">
                    Privacy Policy
                  </Link>{' '}
                  and consent to data processing
                </Label>
              </div>
              {errors.acceptDataProcessing && (
                <p className="text-sm text-destructive">{errors.acceptDataProcessing.message}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 font-semibold py-3 shadow-md"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-0">
          <motion.p
            className="text-center text-sm text-muted-foreground w-full"
            variants={fadeInUp}
          >
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </motion.p>
        </CardFooter>
      </motion.div>
    </div>
  );
}