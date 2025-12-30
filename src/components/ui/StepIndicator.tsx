"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  current: number;
  total: number;
  className?: string;
}

export function StepIndicator({ current, total, className }: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm text-slate font-body">
        Exercise {current} of {total}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.03 }}
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-200",
              index < current - 1
                ? "bg-sage" // completed
                : index === current - 1
                ? "bg-terracotta" // current
                : "bg-border" // upcoming
            )}
          />
        ))}
      </div>
    </div>
  );
}
