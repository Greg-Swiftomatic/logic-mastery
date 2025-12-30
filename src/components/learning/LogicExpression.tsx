"use client";

import { cn } from "@/lib/utils";

interface LogicExpressionProps {
  children: string;
  size?: "sm" | "md" | "lg";
  block?: boolean;
  className?: string;
}

export function LogicExpression({
  children,
  size = "md",
  block = false,
  className,
}: LogicExpressionProps) {
  // Highlight logic symbols
  const formatExpression = (expr: string) => {
    const symbols = ["∧", "∨", "¬", "→", "↔", "⊢", "∀", "∃", "⊥", "⊤"];
    const parts: { text: string; isSymbol: boolean }[] = [];
    let current = "";

    for (const char of expr) {
      if (symbols.includes(char)) {
        if (current) {
          parts.push({ text: current, isSymbol: false });
          current = "";
        }
        parts.push({ text: char, isSymbol: true });
      } else {
        current += char;
      }
    }
    if (current) {
      parts.push({ text: current, isSymbol: false });
    }

    return parts;
  };

  const parts = formatExpression(children);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const content = (
    <span
      className={cn(
        "font-mono",
        sizeClasses[size],
        block && "block text-center py-4",
        className
      )}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          className={cn(
            part.isSymbol ? "text-terracotta font-bold mx-0.5" : "text-charcoal"
          )}
        >
          {part.text}
        </span>
      ))}
    </span>
  );

  if (block) {
    return (
      <div className="my-4 bg-parchment rounded-lg border border-border">
        {content}
      </div>
    );
  }

  return content;
}
