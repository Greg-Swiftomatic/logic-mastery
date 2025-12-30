"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-terracotta text-warm-white hover:bg-terracotta-dark active:bg-terracotta-dark shadow-sm",
  secondary:
    "bg-warm-white text-charcoal border border-border hover:bg-parchment active:bg-parchment",
  ghost:
    "bg-transparent text-slate hover:bg-parchment active:bg-parchment",
  danger:
    "bg-dusty-rose text-warm-white hover:bg-[#B06B6B] active:bg-[#A05A5A]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded",
  md: "px-4 py-2 text-base rounded-md",
  lg: "px-6 py-3 text-lg rounded-md",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "font-body font-medium inline-flex items-center justify-center gap-2 transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
