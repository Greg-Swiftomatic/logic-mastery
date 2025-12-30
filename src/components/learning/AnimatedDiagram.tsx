"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type DiagramType = "implication" | "conjunction" | "disjunction" | "negation" | "biconditional";

interface AnimatedDiagramProps {
  type: DiagramType;
  autoplay?: boolean;
}

export function AnimatedDiagram({ type, autoplay = false }: AnimatedDiagramProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const diagrams: Record<DiagramType, { title: string; description: string }> = {
    implication: {
      title: "Implication (→)",
      description: "P → Q: If P is true, then Q must be true",
    },
    conjunction: {
      title: "Conjunction (∧)",
      description: "P ∧ Q: Both P and Q must be true",
    },
    disjunction: {
      title: "Disjunction (∨)",
      description: "P ∨ Q: At least one of P or Q is true",
    },
    negation: {
      title: "Negation (¬)",
      description: "¬P: The opposite of P",
    },
    biconditional: {
      title: "Biconditional (↔)",
      description: "P ↔ Q: P and Q have the same truth value",
    },
  };

  const diagram = diagrams[type];

  return (
    <div className="my-6 bg-warm-white border border-border rounded-lg overflow-hidden">
      <div className="bg-parchment px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="font-mono text-sm text-charcoal">{diagram.title}</span>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs text-slate hover:text-terracotta transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <div className="p-6">
        {/* SVG Diagram based on type */}
        <svg
          viewBox="0 0 300 150"
          className="w-full max-w-md mx-auto"
          style={{ maxHeight: "150px" }}
        >
          {type === "implication" && (
            <ImplicationDiagram isPlaying={isPlaying} />
          )}
          {type === "conjunction" && (
            <ConjunctionDiagram isPlaying={isPlaying} />
          )}
          {type === "disjunction" && (
            <DisjunctionDiagram isPlaying={isPlaying} />
          )}
          {type === "negation" && <NegationDiagram isPlaying={isPlaying} />}
          {type === "biconditional" && (
            <BiconditionalDiagram isPlaying={isPlaying} />
          )}
        </svg>

        <p className="text-center text-sm text-slate mt-4">{diagram.description}</p>
      </div>
    </div>
  );
}

function ImplicationDiagram({ isPlaying }: { isPlaying: boolean }) {
  return (
    <g>
      {/* P circle */}
      <motion.circle
        cx="75"
        cy="75"
        r="40"
        fill="none"
        stroke="#C75B39"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isPlaying ? 1 : 0 }}
        transition={{ duration: 1, repeat: isPlaying ? Infinity : 0, repeatDelay: 1 }}
      />
      <text x="75" y="80" textAnchor="middle" fill="#2C2C2C" fontFamily="monospace" fontSize="24">
        P
      </text>

      {/* Arrow */}
      <motion.path
        d="M 125 75 L 175 75"
        stroke="#5C5C5C"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5, repeat: isPlaying ? Infinity : 0, repeatDelay: 1.5 }}
      />
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#5C5C5C" />
        </marker>
      </defs>

      {/* Q circle */}
      <motion.circle
        cx="225"
        cy="75"
        r="40"
        fill="none"
        stroke="#5B8C6A"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isPlaying ? 1 : 0 }}
        transition={{ duration: 1, delay: 1, repeat: isPlaying ? Infinity : 0, repeatDelay: 1 }}
      />
      <text x="225" y="80" textAnchor="middle" fill="#2C2C2C" fontFamily="monospace" fontSize="24">
        Q
      </text>
    </g>
  );
}

function ConjunctionDiagram({ isPlaying }: { isPlaying: boolean }) {
  return (
    <g>
      {/* Overlapping circles (Venn-like) */}
      <motion.circle
        cx="110"
        cy="75"
        r="50"
        fill="none"
        stroke="#C75B39"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0, repeatDelay: 2 }}
      />
      <motion.circle
        cx="190"
        cy="75"
        r="50"
        fill="none"
        stroke="#5B8C6A"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3, repeat: isPlaying ? Infinity : 0, repeatDelay: 2 }}
      />
      {/* Intersection highlight */}
      <motion.ellipse
        cx="150"
        cy="75"
        rx="25"
        ry="45"
        fill="#C9A227"
        opacity="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 0.3 : 0 }}
        transition={{ duration: 0.5, delay: 0.8, repeat: isPlaying ? Infinity : 0, repeatDelay: 2 }}
      />
      <text x="70" y="80" fill="#C75B39" fontFamily="monospace" fontSize="20">P</text>
      <text x="220" y="80" fill="#5B8C6A" fontFamily="monospace" fontSize="20">Q</text>
      <text x="150" y="80" textAnchor="middle" fill="#C9A227" fontFamily="monospace" fontSize="16" fontWeight="bold">∧</text>
    </g>
  );
}

function DisjunctionDiagram({ isPlaying }: { isPlaying: boolean }) {
  return (
    <g>
      {/* Two circles with full area highlighted */}
      <motion.circle
        cx="110"
        cy="75"
        r="50"
        fill="#C75B39"
        opacity="0.2"
        stroke="#C75B39"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0, repeatDelay: 2 }}
      />
      <motion.circle
        cx="190"
        cy="75"
        r="50"
        fill="#5B8C6A"
        opacity="0.2"
        stroke="#5B8C6A"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3, repeat: isPlaying ? Infinity : 0, repeatDelay: 2 }}
      />
      <text x="70" y="80" fill="#C75B39" fontFamily="monospace" fontSize="20">P</text>
      <text x="220" y="80" fill="#5B8C6A" fontFamily="monospace" fontSize="20">Q</text>
      <text x="150" y="130" textAnchor="middle" fill="#5C5C5C" fontFamily="monospace" fontSize="14">Either or both</text>
    </g>
  );
}

function NegationDiagram({ isPlaying }: { isPlaying: boolean }) {
  return (
    <g>
      {/* P circle */}
      <motion.circle
        cx="100"
        cy="75"
        r="40"
        fill="#C75B39"
        opacity="0.2"
        stroke="#C75B39"
        strokeWidth="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? [0, 1, 0] : 0 }}
        transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
      />
      <text x="100" y="80" textAnchor="middle" fill="#C75B39" fontFamily="monospace" fontSize="24">P</text>

      {/* Arrow */}
      <motion.path
        d="M 150 75 L 180 75"
        stroke="#5C5C5C"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />

      {/* ¬P - inverse */}
      <motion.circle
        cx="220"
        cy="75"
        r="40"
        fill="none"
        stroke="#5B8C6A"
        strokeWidth="3"
        strokeDasharray="8 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? [0, 0, 1] : 0 }}
        transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
      />
      <text x="220" y="80" textAnchor="middle" fill="#5B8C6A" fontFamily="monospace" fontSize="24">¬P</text>
    </g>
  );
}

function BiconditionalDiagram({ isPlaying }: { isPlaying: boolean }) {
  return (
    <g>
      {/* Two circles with bidirectional arrow */}
      <motion.circle
        cx="75"
        cy="75"
        r="35"
        fill="none"
        stroke="#C75B39"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <text x="75" y="80" textAnchor="middle" fill="#2C2C2C" fontFamily="monospace" fontSize="20">P</text>

      {/* Bidirectional arrow */}
      <motion.path
        d="M 120 75 L 180 75"
        stroke="#C9A227"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0, repeatType: "reverse", repeatDelay: 1 }}
      />
      <motion.polygon
        points="175,70 185,75 175,80"
        fill="#C9A227"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      />
      <motion.polygon
        points="125,70 115,75 125,80"
        fill="#C9A227"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      />

      <motion.circle
        cx="225"
        cy="75"
        r="35"
        fill="none"
        stroke="#5B8C6A"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <text x="225" y="80" textAnchor="middle" fill="#2C2C2C" fontFamily="monospace" fontSize="20">Q</text>

      <text x="150" y="130" textAnchor="middle" fill="#5C5C5C" fontFamily="monospace" fontSize="12">Same truth value</text>
    </g>
  );
}
