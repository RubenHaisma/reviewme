'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Star, Rocket } from 'lucide-react';
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
      className={`sticky top-0 bg-white/90 backdrop-blur-xl z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg border-b border-gray-100' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="font-bold flex-shrink-0 relative"
            whileHover="hover"
            initial="initial"
          >
            <Link href="/" className="relative group flex items-center">
              <div className="relative overflow-hidden flex items-center">
                {/* Logo icon */}
                <motion.div
                  className="mr-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full w-8 h-8 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Star className="h-4 w-4 text-white" />
                </motion.div>
                
                {/* Split text into individual letters for animation */}
                <div className="flex">
                  {"OpiniFlow".split('').map((letter, i) => (
                    <motion.span
                      key={`letter-${i}`}
                      custom={i}
                      variants={letterVariants}
                      className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent inline-block transition-all duration-300"
                      style={{ 
                        fontWeight: 800, 
                        textShadow: '0 2px 10px rgba(59, 130, 246, 0.2)',
                        fontSize: '1.5rem',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
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
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
                </Link>
              </motion.div>
            )}
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
                  className="text-gray-700 hover:text-blue-600 font-medium relative group overflow-hidden"
                >
                  <span>Sign In</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="overflow-hidden"
            >
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium">
                  <span className="flex items-center">
                    Get Started
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Rocket className="ml-2 w-4 h-4" />
                    </motion.span>
                  </span>
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
              <Menu className="h-6 w-6 text-gray-600 relative z-10" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto py-6 px-4 flex flex-col items-center gap-4">
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
                      className="text-gray-600 hover:text-blue-600 font-medium transition-colors block relative group w-full py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
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
                      className="text-gray-600 hover:text-blue-600 font-medium transition-colors block relative group w-full py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Dashboard</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
                    </Link>
                  </motion.div>
                )}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>
                <motion.div
                  className="flex flex-col gap-3 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (menuItems.length + 1) * 0.1 }}
                >
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full relative group overflow-hidden text-gray-700 py-5">
                      <span className="relative z-10">Sign In</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-5 rounded-full shadow-md transition-all duration-300">
                      <span className="flex items-center justify-center">
                        Get Started
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Rocket className="ml-2 w-4 h-4" />
                        </motion.span>
                      </span>
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