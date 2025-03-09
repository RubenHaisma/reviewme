// components/ui/count-up.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountUpProps {
  value: string; // e.g., "100+", "5,000+", "69%", "12 hrs"
  delay?: number; // Delay in seconds before animation starts
  duration?: number; // Animation duration in seconds
}

export function CountUp({ value, delay = 0, duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0; // Extract number
  const suffix = value.replace(/[0-9]/g, ''); // Extract suffix (+, %, hrs, etc.)

  useEffect(() => {
    const startTime = Date.now();
    const endValue = numericValue;
    const animationDuration = duration * 1000; // Convert to ms

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / animationDuration, 1); // 0 to 1
      const easedProgress = 1 - Math.pow(1 - progress, 4); // Ease-out effect
      const currentCount = Math.floor(easedProgress * endValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue); // Ensure final value is exact
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [numericValue, delay, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
}