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
  theme?: 'blue' | 'gray' | 'minimal';
}

export function WorkflowAnimation({ steps, theme = 'blue' }: WorkflowAnimationProps) {
  // Theme configuration - more professional and subdued
  const themeColors = {
    blue: {
      primary: "#3b82f6",
      secondary: "#93c5fd",
      line: "#bfdbfe",
      progressLine: "from-blue-500 to-blue-600",
      iconBg: "#f0f9ff",
      cardBg: "bg-white",
      border: "border-blue-100"
    },
    gray: {
      primary: "#4b5563",
      secondary: "#9ca3af",
      line: "#e5e7eb",
      progressLine: "from-gray-500 to-gray-600",
      iconBg: "#f9fafb",
      cardBg: "bg-white",
      border: "border-gray-100"
    },
    minimal: {
      primary: "#1e293b",
      secondary: "#64748b",
      line: "#cbd5e1",
      progressLine: "from-slate-700 to-slate-800",
      iconBg: "#f8fafc",
      cardBg: "bg-transparent",
      border: "border-transparent"
    }
  };
  
  const colors = themeColors[theme];

  // Simplified animation variants
  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      },
    }),
  };

  // Simplified icon animation - subtle and professional
  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative py-12 px-6 overflow-hidden rounded-xl bg-white shadow-md border border-gray-100">
      {/* Horizontal workflow representation */}
      <div className="relative">
        
        {/* Progress line - simpler animation */}
        <motion.div
          className={`absolute top-24 left-0 h-1 bg-gradient-to-r ${colors.progressLine} -translate-y-1/4 origin-left rounded-sm`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 0.98 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Steps with more professional layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
                className="relative flex flex-col items-center text-center z-10"
              >
                {/* Step Number - simplified */}
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {index + 1}
                </div>

                {/* Icon Container - subdued */}
                <motion.div
                  className={`relative w-16 h-16 rounded-full ${colors.border} flex items-center justify-center mb-4 z-20`}
                  style={{ 
                    backgroundColor: colors.iconBg,
                    border: `1px solid ${colors.line}`
                  }}
                  whileHover="hover"
                  initial="initial"
                  variants={iconVariants}
                >
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: colors.primary }} 
                  />
                </motion.div>

                {/* Connection indicator for workflow */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="absolute top-8 left-1/2 h-0.5 hidden lg:block"
                    style={{ 
                      backgroundColor: colors.line,
                      width: 'calc(100% - 2rem)',
                      transform: 'translateX(calc(50% + 1rem))'
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5, ease: "easeOut" }}
                  />
                )}

                {/* Arrow between steps - mobile friendly*/}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-full w-4 h-4 transform translate-x-1 -translate-y-1/2 lg:hidden">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M8 1L15 8L8 15" 
                        stroke={colors.secondary} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Title - simple and clear */}
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: colors.primary }}
                >
                  {step.title}
                </h3>

                {/* Description - professional styling */}
                <p
                  className="text-sm max-w-xs leading-relaxed"
                  style={{ color: colors.secondary }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Vertical workflow representation for mobile */}
      <div className="lg:hidden mt-8 relative">
        <div 
          className="absolute top-0 left-8 h-full w-0.5"
          style={{ backgroundColor: colors.line }}
        />
        
        <motion.div
          className={`absolute top-0 left-8 w-1 bg-gradient-to-b ${colors.progressLine} -translate-x-1/4 origin-top rounded-sm`}
          style={{ height: `calc(100% - 16px)` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={`mobile-${step.title}`}
                custom={index}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative flex items-start pl-16"
              >
                <motion.div
                  className={`absolute left-0 top-0 w-16 h-16 rounded-full ${colors.border} flex items-center justify-center z-20`}
                  style={{ 
                    backgroundColor: colors.iconBg,
                    border: `1px solid ${colors.line}`
                  }}
                  whileHover="hover"
                  initial="initial"
                  variants={iconVariants}
                >
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {index + 1}
                  </div>
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: colors.primary }} 
                  />
                </motion.div>

                <div className="pt-2">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: colors.primary }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: colors.secondary }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Responsive breakpoint indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-1 right-1 px-1.5 py-0.5 bg-gray-800 text-white text-xs rounded-md opacity-50 z-50">
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