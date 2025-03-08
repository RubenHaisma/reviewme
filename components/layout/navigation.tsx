"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Navigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">Raatum</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-9">
          <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
            How It Works
          </Link>
          <Link href="/features" className="text-muted-foreground hover:text-primary">
            Features
          </Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-primary">
            Pricing
          </Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
              Dashboard
            </Link>
          )}
          <Link href="/contact" className="text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link
              href="/how-it-works"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/features"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}