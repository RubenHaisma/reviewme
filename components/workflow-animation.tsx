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
    hidden: { opacity: 0, y: 70, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, 10, -10, 0], 
      scale: [1, 1.15, 1.1, 1.15], 
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    pulse: { 
      scale: [1, 1.1, 1], 
      filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
      transition: { 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut" 
      } 
    },
  };

  // Blue theme colors
  const primaryBlue = "#3b82f6"; // Primary blue
  const lightBlue = "#93c5fd";   // Light blue
  const darkBlue = "#1e40af";    // Dark blue

  return (
    <div className="relative py-16 px-4 overflow-hidden rounded-xl bg-white shadow-xl">
      {/* Subtle Blue Background Patterns */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-30"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-0 left-20 w-72 h-72 rounded-full bg-blue-50 blur-3xl opacity-40"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating Blue Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-blue-400/30"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{ 
            y: ["-10%", "110%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}

      {/* Connecting Line with Blue Glow */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -translate-y-1/2" />
      
      {/* Animated Progress Line with Blue Gradient */}
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent -translate-y-1/2 origin-left shadow-[0_0_15px_rgba(59,130,246,0.6)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "anticipate" }}
      />

      {/* Steps */}
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              custom={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative flex flex-col items-center text-center group z-10"
            >
              {/* Step Number */}
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.4, type: "spring" }}
              >
                {index + 1}
              </motion.div>

              {/* Icon Container with Enhanced Effects */}
              <motion.div
                className="relative w-24 h-24 rounded-full bg-white border border-blue-200 flex items-center justify-center mb-6 shadow-lg z-10"
                whileHover="hover"
                initial="initial"
                animate="pulse"
              >
                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-300/30"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1], 
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 rounded-full border border-blue-200/50"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.4, 1], 
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.2 + 0.5
                  }}
                />
                
                <motion.div
                  variants={iconVariants}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <Icon className="w-12 h-12 text-blue-500 drop-shadow-[0_0_3px_rgba(59,130,246,0.3)]" />
                </motion.div>
              </motion.div>

              {/* Title with Slide-in Effect */}
              <motion.h3
                className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
              >
                {step.title}
              </motion.h3>

              {/* Description with Fade-in */}
              <motion.p
                className="text-sm text-gray-600 max-w-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.7 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* Responsive breakpoint indicator - helps during development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-1 right-1 px-1.5 py-0.5 bg-blue-800 text-white text-xs rounded-md opacity-50 z-50">
          <span className="sm:hidden">xs</span>
          <span className="hidden sm:inline md:hidden">sm</span>
          <span className="hidden md:inline lg:hidden">md</span>
          <span className="hidden lg:inline xl:hidden">lg</span>
          <span className="hidden xl:inline 2xl:hidden">xl</span>
          <span className="hidden 2xl:inline">2xl</span>
        </div>
      )}
    </div>
  );
}