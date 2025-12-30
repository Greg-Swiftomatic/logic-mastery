"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { MODULES } from "@/types/module";

interface ModuleLinkProps {
  to: number;
  children: ReactNode;
}

export function ModuleLink({ to, children }: ModuleLinkProps) {
  const targetModule = MODULES.find((m) => m.id === to);

  if (!targetModule) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="my-6"
    >
      <Link
        href={`/module/${targetModule.slug}`}
        className="block p-4 bg-warm-white border border-border rounded-lg hover:border-terracotta hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4">
          {/* Module icon */}
          <div className="w-12 h-12 bg-parchment rounded-lg flex items-center justify-center font-mono text-xl text-terracotta">
            {targetModule.icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-sm text-muted mb-1">Up Next</p>
            <p className="font-display font-medium text-charcoal">
              Module {targetModule.id}: {targetModule.title}
            </p>
            <p className="text-sm text-slate">{children}</p>
          </div>

          {/* Arrow */}
          <div className="text-terracotta">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
