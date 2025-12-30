"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { size: 40, strokeWidth: 3, fontSize: "text-xs" },
  md: { size: 64, strokeWidth: 4, fontSize: "text-sm" },
  lg: { size: 96, strokeWidth: 6, fontSize: "text-lg" },
};

export function ProgressRing({
  percentage,
  size = "md",
  showLabel = true,
  className,
}: ProgressRingProps) {
  const config = sizeConfig[size];
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color based on percentage
  const getColor = () => {
    if (percentage >= 70) return "#5B8C6A"; // sage
    if (percentage >= 40) return "#C9A227"; // gold
    return "#C75B39"; // terracotta
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.size}
        height={config.size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          stroke="#E8E4DC"
          strokeWidth={config.strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      {showLabel && (
        <span
          className={cn(
            "absolute font-body font-medium text-charcoal",
            config.fontSize
          )}
        >
          {percentage}%
        </span>
      )}
    </div>
  );
}
