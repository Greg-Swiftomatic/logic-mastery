"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModuleNavProps {
  moduleSlug: string;
}

const tabs = [
  { id: "lesson", label: "Lesson", icon: "📖" },
  { id: "examples", label: "Examples", icon: "✏️" },
  { id: "practice", label: "Practice", icon: "🎯" },
  { id: "summary", label: "Summary", icon: "📋" },
];

export function ModuleNav({ moduleSlug }: ModuleNavProps) {
  const pathname = usePathname();

  // Determine active tab from pathname
  const activeTab = tabs.find((tab) =>
    pathname.includes(`/${tab.id}`)
  )?.id || "lesson";

  return (
    <nav className="border-b border-border bg-warm-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const href = `/module/${moduleSlug}/${tab.id}`;

            return (
              <Link
                key={tab.id}
                href={href}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "text-terracotta"
                    : "text-slate hover:text-charcoal"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="hidden sm:inline">{tab.icon}</span>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
