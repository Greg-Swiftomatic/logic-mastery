"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WorkedProblemProps {
  number: number;
  children: ReactNode;
}

export function WorkedProblem({ number, children }: WorkedProblemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: number * 0.1 }}
      className="my-8 bg-warm-white border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-terracotta/10 px-4 py-3 border-b border-border flex items-center gap-3">
        <span className="w-8 h-8 bg-terracotta text-warm-white rounded-full flex items-center justify-center font-display font-semibold text-sm">
          {number}
        </span>
        <span className="font-display font-medium text-charcoal">
          Worked Example
        </span>
      </div>

      {/* Content */}
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

interface ProblemProps {
  children: ReactNode;
}

export function Problem({ children }: ProblemProps) {
  return (
    <div className="mb-6 p-4 bg-parchment rounded-lg border border-border">
      <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
        Problem
      </p>
      <div className="font-mono text-charcoal">{children}</div>
    </div>
  );
}

interface StepProps {
  number: number;
  children: ReactNode;
}

export function Step({ number, children }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: number * 0.15 }}
      className="flex gap-4 mb-4 last:mb-0"
    >
      {/* Step number */}
      <div className="flex-shrink-0">
        <span className="w-7 h-7 bg-parchment border border-border rounded-full flex items-center justify-center text-sm font-medium text-slate">
          {number}
        </span>
      </div>

      {/* Step content */}
      <div className="flex-1 pt-0.5">
        <div className="text-slate text-sm leading-relaxed [&>code]:bg-parchment [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-charcoal">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

interface CommonMistakeProps {
  children: ReactNode;
}

export function CommonMistake({ children }: CommonMistakeProps) {
  return (
    <div className="mt-6 p-4 bg-gold-light border-l-4 border-gold rounded-r-lg">
      <div className="flex gap-2 items-start">
        <span className="text-gold text-lg">⚠</span>
        <div>
          <p className="text-sm font-medium text-gold mb-1">Watch Out!</p>
          <div className="text-sm text-charcoal">{children}</div>
        </div>
      </div>
    </div>
  );
}
