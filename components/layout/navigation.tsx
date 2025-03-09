'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const letterVariants = {
    hover: (i: number) => ({
      y: [-2, -8, -2],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: i * 0.07,
      }
    }),
    initial: { y: 0 }
  };

  return (
    <motion.nav
      className={`sticky top-0 bg-background/80 backdrop-blur-sm z-50 border-b transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center">
          {/* Logo */}
          <motion.div
            className="text-xl font-bold flex-shrink-0 relative"
            whileHover="hover"
            initial="initial"
          >
            <Link href="/" className="relative group flex items-center">
              <div className="relative overflow-hidden">
                {/* Split the text into individual letters for animation */}
                <div className="flex">
                  {"Raatum".split('').map((letter, i) => (
                    <motion.span
                      key={`letter-${i}`}
                      custom={i}
                      variants={letterVariants}
                      className="bg-gradient-to-br from-primary via-blue-600 to-blue-500 bg-clip-text text-transparent inline-block transition-all duration-300"
                      style={{ 
                        fontWeight: 800, 
                        textShadow: '0 2px 10px rgba(79, 70, 229, 0.2)',
                        fontSize: '1.5rem',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                {/* Animated glow effect */}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary via-violet-500 to-blue-500"
                  initial={{ opacity: 0.4 }}
                  animate={{ 
                    opacity: [0.4, 0.8, 0.4],
                    boxShadow: [
                      '0 0 5px rgba(79, 70, 229, 0.5)',
                      '0 0 12px rgba(79, 70, 229, 0.8)',
                      '0 0 5px rgba(79, 70, 229, 0.5)'
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                />
              </div>
            </Link>
          </motion.div>

          {/* Spacer to balance the layout */}
          <div className="flex-1 flex justify-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden"
                >
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
                  </Link>
                </motion.div>
              ))}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: menuItems.length * 0.1 }}
                  className="relative overflow-hidden"
                >
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary transition-colors relative group"
                  >
                    Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden"
            >
              <Link href="/auth/login">
                <Button 
                  variant="ghost" 
                  className="relative group overflow-hidden"
                >
                  <span>Sign In</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="overflow-hidden"
            >
              <Link href="/auth/register">
                <Button className="relative overflow-hidden group bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 transition-all duration-300">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.div
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
              className="relative overflow-hidden group"
            >
              <Menu className="h-6 w-6 relative z-10" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-background/95 backdrop-blur-sm border-b"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col items-center gap-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors block relative group w-full py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
                    </Link>
                  </motion.div>
                ))}
                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuItems.length * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      href="/dashboard"
                      className="text-muted-foreground hover:text-primary transition-colors block relative group w-full py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Dashboard</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
                    </Link>
                  </motion.div>
                )}
                <motion.div
                  className="flex flex-col gap-2 pt-2 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (menuItems.length + 1) * 0.1 }}
                >
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full relative group overflow-hidden">
                      <span className="relative z-10">Sign In</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full relative group overflow-hidden bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 transition-all duration-300">
                      <span className="relative z-10">Get Started</span>
                      <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}