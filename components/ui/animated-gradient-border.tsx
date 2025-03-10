import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
}

export function AnimatedGradientText({ text, className }: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent",
        "animate-text-gradient bg-[200%_auto]",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.span>
  );
}