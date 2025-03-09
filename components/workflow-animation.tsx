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
  return (
    <div className="relative">
      {/* Connecting Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20 -translate-y-1/2" />
      
      {/* Progress Line */}
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Steps */}
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-8 h-8 text-primary" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: [0, 1.2, 1], opacity: [0, 0.2, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}