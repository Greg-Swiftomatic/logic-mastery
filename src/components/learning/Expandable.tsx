"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Expandable({ title, children, defaultOpen = false }: ExpandableProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-6 border border-border rounded-lg overflow-hidden bg-warm-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-parchment transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-charcoal">
          <span className="text-terracotta">▼</span>
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted"
        >
          <svg
            className="w-5 h-5"
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
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 border-t border-border bg-parchment/30">
              <div className="text-sm text-slate [&>p]:mb-3 [&>p:last-child]:mb-0">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
