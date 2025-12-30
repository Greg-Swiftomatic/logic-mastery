"use client";

import { cn, getDomainColor } from "@/lib/utils";
import { Domain } from "@/types/module";

interface DomainTagProps {
  domain: Domain;
  size?: "sm" | "md";
  className?: string;
}

const domainLabels: Record<Domain, string> = {
  programming: "Programming",
  law: "Law",
  science: "Science",
  everyday: "Everyday",
};

const domainIcons: Record<Domain, string> = {
  programming: "{ }",
  law: "§",
  science: "⚗",
  everyday: "☀",
};

export function DomainTag({ domain, size = "md", className }: DomainTagProps) {
  const colors = getDomainColor(domain);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-body font-medium rounded-full",
        colors.bg,
        colors.text,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      <span className="font-mono">{domainIcons[domain]}</span>
      {domainLabels[domain]}
    </span>
  );
}
