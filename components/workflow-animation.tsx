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
  // Theme configuration aligned with Navigation component
  const themeColors = {
    blue: {
      primary: "from-blue-600 to-cyan-500",
      textPrimary: "text-blue-600",
      text: "text-gray-600",
      line: "#e5e7eb",
      iconBg: "bg-white",
      cardBg: "bg-white/90",
      border: "border-gray-100",
    },
    gray: {
      primary: "from-gray-600 to-gray-500",
      textPrimary: "text-gray-600",
      text: "text-gray-600",
      line: "#e5e7eb",
      iconBg: "bg-white",
      cardBg: "bg-white/90",
      border: "border-gray-100",
    },
    minimal: {
      primary: "from-slate-700 to-slate-800",
      textPrimary: "text-slate-700",
      text: "text-gray-600",
      line: "#cbd5e1",
      iconBg: "bg-white",
      cardBg: "bg-transparent",
      border: "border-transparent",
    },
  };

  const colors = themeColors[theme];

  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      }
    }
  };

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

  return (
    <motion.div 
      className={`relative py-8 px-4 overflow-hidden rounded-xl ${colors.cardBg} backdrop-blur-xl shadow-md border ${colors.border}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Mobile Vertical Layout */}
      <div className="block lg:hidden relative">
        <div
          className="absolute top-0 left-6 w-0.5 h-full"
          style={{ backgroundColor: colors.line }}
        />
        <motion.div
          className={`absolute top-0 left-6 w-1 bg-gradient-to-b ${colors.primary} -translate-x-1/2 origin-top rounded-full`}
          style={{ height: "calc(100% - 8px)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={`mobile-${step.title}`}
                custom={index}
                variants={stepVariants}
                className="relative flex items-start pl-12"
              >
                <div
                  className={`absolute left-0 top-0 w-12 h-12 rounded-full border ${colors.border} ${colors.iconBg} flex items-center justify-center`}
                >
                  <div
                    className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r ${colors.primary} flex items-center justify-center text-xs font-medium text-white`}
                  >
                    {index + 1}
                  </div>
                  <Icon className={`w-6 h-6 ${colors.textPrimary}`} />
                </div>
                <div className="pt-1">
                  <h3
                    className={`text-base font-semibold mb-1 ${colors.textPrimary} relative group`}
                  >
                    {step.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
                  </h3>
                  <p className={`text-sm leading-relaxed ${colors.text}`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop Horizontal Layout */}
      <div className="hidden lg:block relative">
        <div
          className="absolute top-16 left-0 w-full h-0.5"
          style={{ backgroundColor: colors.line }}
        />
        
        <motion.div
          className={`absolute top-16 left-0 h-1 bg-gradient-to-r ${colors.primary} origin-left rounded-full`}
          style={{ width: "98%" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        <div className="grid grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                custom={index}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 rounded-full border ${colors.border} ${colors.iconBg} flex items-center justify-center mb-3`}>
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${colors.primary} flex items-center justify-center text-xs font-medium text-white`}
                  >
                    {index + 1}
                  </div>
                  <Icon className={`w-7 h-7 ${colors.textPrimary}`} />
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${colors.textPrimary} relative group`}>
                  {step.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 ease-in-out" />
                </h3>
                <p className={`text-sm max-w-xs leading-relaxed ${colors.text}`}>
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
    </motion.div>
  );
}