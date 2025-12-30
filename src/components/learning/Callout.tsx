"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "why" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: string; bg: string; border: string; title: string; iconColor: string }
> = {
  info: {
    icon: "ℹ",
    bg: "bg-[#E8EEF4]",
    border: "border-[#6B8CAE]",
    iconColor: "text-[#6B8CAE]",
    title: "Note",
  },
  warning: {
    icon: "⚠",
    bg: "bg-gold-light",
    border: "border-gold",
    iconColor: "text-gold",
    title: "Common Mistake",
  },
  why: {
    icon: "💡",
    bg: "bg-terracotta/5",
    border: "border-terracotta",
    iconColor: "text-terracotta",
    title: "Why This Matters",
  },
  tip: {
    icon: "✦",
    bg: "bg-sage-light",
    border: "border-sage",
    iconColor: "text-sage",
    title: "Tip",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        config.bg,
        config.border
      )}
    >
      <div className="flex gap-3">
        <span className={cn("text-lg flex-shrink-0", config.iconColor)}>
          {config.icon}
        </span>
        <div className="min-w-0">
          <p className={cn("font-medium text-charcoal text-sm mb-1", config.iconColor)}>
            {title || config.title}
          </p>
          <div className="text-sm text-slate [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
