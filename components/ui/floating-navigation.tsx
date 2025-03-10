import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function FloatingNavigation({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [-100, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.nav
      style={{ opacity, y }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "px-4 py-2 rounded-full bg-background/80 backdrop-blur-lg border shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">Home</Button>
        </Link>
        <Link href="/features">
          <Button variant="ghost" size="sm">Features</Button>
        </Link>
        <Link href="/pricing">
          <Button variant="ghost" size="sm">Pricing</Button>
        </Link>
        <Link href="/auth/register">
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}