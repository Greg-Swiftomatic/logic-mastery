"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DefinitionProps {
  term: string;
  children: ReactNode;
}

export function Definition({ term, children }: DefinitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="my-4 flex gap-4 p-4 bg-warm-white border border-border rounded-lg"
    >
      <div className="flex-shrink-0 w-1 bg-terracotta rounded-full" />
      <div>
        <dt className="font-display font-semibold text-charcoal text-lg mb-1">
          {term}
        </dt>
        <dd className="text-slate text-sm leading-relaxed">{children}</dd>
      </div>
    </motion.div>
  );
}
