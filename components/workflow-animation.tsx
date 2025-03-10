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
  // Theme configuration - professional and subdued
  const themeColors = {
    blue: {
      primary: "#3b82f6",
      secondary: "#93c5fd",
      line: "#bfdbfe",
      progressLine: "from-blue-500 to-blue-600",
      iconBg: "#f0f9ff",
      cardBg: "bg-white",
      border: "border-blue-100",
    },
    gray: {
      primary: "#4b5563",
      secondary: "#9ca3af",
      line: "#e5e7eb",
      progressLine: "from-gray-500 to-gray-600",
      iconBg: "#f9fafb",
      cardBg: "bg-white",
      border: "border-gray-100",
    },
    minimal: {
      primary: "#1e293b",
      secondary: "#64748b",
      line: "#cbd5e1",
      progressLine: "from-slate-700 to-slate-800",
      iconBg: "#f8fafc",
      cardBg: "bg-transparent",
      border: "border-transparent",
    },
  };

  const colors = themeColors[theme];

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  return (
    <div className="relative py-8 px-4 overflow-hidden rounded-xl bg-white shadow-md border border-gray-100">
      {/* Mobile Vertical Layout (hidden on lg and above) */}
      <div className="block lg:hidden relative">
        <div
          className="absolute top-0 left-6 w-0.5 h-full"
          style={{ backgroundColor: colors.line }}
        />
        <motion.div
          className={`absolute top-0 left-6 w-1 bg-gradient-to-b ${colors.progressLine} -translate-x-1/2 origin-top rounded-sm`}
          style={{ height: "calc(100% - 8px)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div className="space-y-6">
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
                className="relative flex items-start pl-12"
              >
                <motion.div
                  className={`absolute left-0 top-0 w-12 h-12 rounded-full ${colors.border} flex items-center justify-center`}
                  style={{
                    backgroundColor: colors.iconBg,
                    border: `1px solid ${colors.line}`,
                  }}
                  whileHover="hover"
                  initial="initial"
                  variants={iconVariants}
                >
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {index + 1}
                  </div>
                  <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                </motion.div>
                <div className="pt-1">
                  <h3
                    className="text-base font-semibold mb-1"
                    style={{ color: colors.primary }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
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

      {/* Desktop Horizontal Layout (hidden below lg) */}
      <div className="hidden lg:block relative">
        <motion.div
          className={`absolute top-16 left-0 h-1 bg-gradient-to-r ${colors.progressLine} origin-left rounded-sm`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 0.98 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="grid grid-cols-5 gap-6">
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
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {index + 1}
                </div>
                <motion.div
                  className={`w-14 h-14 rounded-full ${colors.border} flex items-center justify-center mb-3`}
                  style={{
                    backgroundColor: colors.iconBg,
                    border: `1px solid ${colors.line}`,
                  }}
                  whileHover="hover"
                  initial="initial"
                  variants={iconVariants}
                >
                  <Icon className="w-7 h-7" style={{ color: colors.primary }} />
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute top-7 left-1/2 h-0.5"
                    style={{
                      backgroundColor: colors.line,
                      width: "calc(100% - 2rem)",
                      transform: "translateX(calc(50% + 1rem))",
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.4, ease: "easeOut" }}
                  />
                )}
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: colors.primary }}
                >
                  {step.title}
                </h3>
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

      {/* Responsive breakpoint indicator (dev only) */}
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