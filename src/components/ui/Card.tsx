"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-warm-white border border-border",
  elevated: "bg-warm-white border border-border shadow-md",
  interactive:
    "bg-warm-white border border-border hover:border-terracotta hover:shadow-md cursor-pointer transition-all duration-200",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", padding = "md", className, children, ...props },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "rounded-lg",
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-4 pb-4 border-b border-border", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("font-display text-xl font-medium text-charcoal", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-slate text-sm mt-1", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mt-4 pt-4 border-t border-border flex items-center gap-3", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
