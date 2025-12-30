"use client";

import { ReactNode } from "react";

type CalloutType = "info" | "warning" | "why" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { symbol: string; label: string; borderColor: string; bgColor: string; textColor: string }
> = {
  info: {
    symbol: "i",
    label: "Note",
    borderColor: "border-prussian",
    bgColor: "bg-prussian-wash",
    textColor: "text-prussian",
  },
  warning: {
    symbol: "!",
    label: "Common Mistake",
    borderColor: "border-vermillion",
    bgColor: "bg-vermillion-wash",
    textColor: "text-vermillion",
  },
  why: {
    symbol: "∴",
    label: "Why This Matters",
    borderColor: "border-gold",
    bgColor: "bg-gold-wash",
    textColor: "text-gold",
  },
  tip: {
    symbol: "✦",
    label: "Tip",
    borderColor: "border-correct",
    bgColor: "bg-correct-light",
    textColor: "text-correct",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];

  return (
    <div className={`my-8 relative`}>
      {/* Editorial-style callout box */}
      <div 
        className={`
          border-l-4 ${config.borderColor} ${config.bgColor}
          pl-6 pr-6 py-5
        `}
      >
        {/* Label badge positioned at top */}
        <div className="flex items-center gap-2 mb-3">
          <span 
            className={`
              w-6 h-6 flex items-center justify-center
              font-mono font-bold text-xs
              ${config.textColor}
              border ${config.borderColor}
            `}
          >
            {config.symbol}
          </span>
          <span className={`caption ${config.textColor}`}>
            {title || config.label}
          </span>
        </div>

        {/* Content */}
        <div className="text-ink-medium leading-relaxed [&>p]:mb-0 [&>p]:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}
