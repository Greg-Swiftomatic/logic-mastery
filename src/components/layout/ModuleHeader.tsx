"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Module } from "@/types/module";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useProgress } from "@/hooks/useProgress";

interface ModuleHeaderProps {
  module: Module;
}

export function ModuleHeader({ module }: ModuleHeaderProps) {
  const { getModuleCompletion, getModuleAccuracy } = useProgress();
  const completion = getModuleCompletion(module.slug);
  const accuracy = getModuleAccuracy(module.slug);

  return (
    <div className="bg-parchment border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-start justify-between">
          {/* Back button and title */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-slate hover:text-terracotta transition-colors mb-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Modules
            </Link>
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-12 h-12 bg-terracotta text-warm-white rounded-lg flex items-center justify-center font-mono text-2xl"
              >
                {module.icon}
              </motion.div>
              <div>
                <h1 className="font-display text-2xl font-semibold text-charcoal">
                  Module {module.id}: {module.title}
                </h1>
                <p className="text-slate text-sm">{module.description}</p>
              </div>
            </div>
          </div>

          {/* Progress stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <ProgressRing percentage={completion} size="md" />
              <p className="text-xs text-muted mt-1">Completion</p>
            </div>
            {accuracy > 0 && (
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center">
                  <span
                    className={`font-display text-2xl font-semibold ${
                      accuracy >= 70 ? "text-sage" : "text-terracotta"
                    }`}
                  >
                    {accuracy}%
                  </span>
                </div>
                <p className="text-xs text-muted mt-1">Accuracy</p>
              </div>
            )}
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mt-4">
          {module.topics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-warm-white border border-border rounded text-xs text-slate"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
