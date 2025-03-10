import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ComponentProps<typeof Button> {
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 40,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    x.set(deltaX / strength);
    y.set(deltaY / strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const transformX = useTransform(mouseXSpring, (val) => `translateX(${val}px)`);
  const transformY = useTransform(mouseYSpring, (val) => `translateY(${val}px)`);

  return (
    <motion.div
      style={{ x: transformX, y: transformY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
    >
      <Button
        className={cn("transition-colors duration-200", className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}