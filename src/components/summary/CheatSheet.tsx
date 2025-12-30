"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CheatSheetProps {
  children: ReactNode;
}

export function CheatSheet({ children }: CheatSheetProps) {
  return (
    <div className="my-6 bg-warm-white border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-terracotta/10 px-4 py-3 border-b border-border">
        <h3 className="font-display font-semibold text-charcoal flex items-center gap-2">
          <span>📋</span>
          Quick Reference
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-parchment/50 border-b border-border">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Symbol
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Truth Condition
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

interface SymbolProps {
  name: string;
  meaning: string;
  truth: string;
}

export function Symbol({ name, meaning, truth }: SymbolProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-border last:border-b-0 hover:bg-parchment/30 transition-colors"
    >
      <td className="px-4 py-3">
        <span className="font-mono text-xl text-terracotta font-bold">
          {name}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="font-medium text-charcoal">{meaning}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-slate">{truth}</span>
      </td>
    </motion.tr>
  );
}
