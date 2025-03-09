'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface WorkflowStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WorkflowAnimationProps {
  steps: WorkflowStep[];
}

export function WorkflowAnimation({ steps }: WorkflowAnimationProps) {
  // Animation variants for the step items
  const stepVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: 360, scale: 1.2 },
    pulse: { scale: [1, 1.1, 1], transition: { duration: 1.5, repeat: Infinity } },
  };

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background Gradient Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />

      {/* Connecting Line with Glow */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20 -translate-y-1/2 shadow-lg" />
      
      {/* Animated Progress Line with Gradient */}
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent -translate-y-1/2 origin-left shadow-[0_0_10px_rgba(0,128,255,0.5)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "anticipate" }}
      />

      {/* Steps */}
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-12 px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              custom={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon Container with Enhanced Effects */}
              <motion.div
                className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 z-10"
                whileHover="hover"
                initial="initial"
                animate="pulse"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.5, 0], opacity: [0, 0.3, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3, duration: 1.2, ease: "easeOut" }}
                />
                <motion.div
                  variants={iconVariants}
                  transition={{ duration: 0.8 }}
                >
                  <Icon className="w-10 h-10 text-primary" />
                </motion.div>
                {/* Particle Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary/30"
                  initial={{ scale: 1, opacity: 0 }}
                  whileInView={{ scale: 1.3, opacity: [0, 0.5, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 + 0.2, duration: 1 }}
                />
              </motion.div>

              {/* Title with Slide-in Effect */}
              <motion.h3
                className="text-xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 + 0.1, duration: 0.5 }}
              >
                {step.title}
              </motion.h3>

              {/* Description with Fade-in */}
              <motion.p
                className="text-sm text-muted-foreground max-w-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 + 0.2, duration: 0.7 }}
              >
                {step.description}
              </motion.p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}