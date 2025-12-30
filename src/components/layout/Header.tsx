"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { MODULES } from "@/types/module";
import { useProgress } from "@/hooks/useProgress";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const { progress, getModuleCompletion } = useProgress();
  const [isModuleMenuOpen, setIsModuleMenuOpen] = useState(false);

  // Calculate overall progress
  const overallProgress = Math.round(
    MODULES.reduce((acc, module) => acc + getModuleCompletion(module.slug), 0) /
      MODULES.length
  );

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="w-10 h-10 bg-terracotta text-warm-white rounded-lg flex items-center justify-center font-mono text-lg font-bold"
          >
            
          </motion.div>
          <div>
            <h1 className="font-display text-lg font-semibold text-charcoal group-hover:text-terracotta transition-colors">
              Logic Mastery
            </h1>
            <p className="text-xs text-muted -mt-0.5">Learn to think clearly</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {/* Module Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsModuleMenuOpen(!isModuleMenuOpen)}
              onBlur={() => setTimeout(() => setIsModuleMenuOpen(false), 150)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isModuleMenuOpen
                  ? "bg-parchment text-charcoal"
                  : "text-slate hover:text-charcoal hover:bg-parchment"
              )}
            >
              Modules
              <svg
                className={cn(
                  "w-4 h-4 transition-transform",
                  isModuleMenuOpen && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isModuleMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-72 bg-warm-white border border-border rounded-lg shadow-lg overflow-hidden"
              >
                {MODULES.map((module, index) => {
                  const completion = getModuleCompletion(module.slug);
                  const isLocked = index > 0 && getModuleCompletion(MODULES[index - 1].slug) < 50;

                  return (
                    <Link
                      key={module.id}
                      href={isLocked ? "#" : `/module/${module.slug}`}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 transition-colors",
                        isLocked
                          ? "opacity-50 cursor-not-allowed bg-parchment/50"
                          : "hover:bg-parchment"
                      )}
                      onClick={(e) => isLocked && e.preventDefault()}
                    >
                      <span className="w-8 h-8 bg-parchment rounded flex items-center justify-center font-mono text-terracotta">
                        {isLocked ? "🔒" : module.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-charcoal text-sm truncate">
                          {module.id}. {module.title}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {module.exerciseCount} exercises
                        </p>
                      </div>
                      {!isLocked && completion > 0 && (
                        <ProgressRing percentage={completion} size="sm" />
                      )}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <ProgressRing percentage={overallProgress} size="sm" />
            <span className="text-sm text-slate">Progress</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
