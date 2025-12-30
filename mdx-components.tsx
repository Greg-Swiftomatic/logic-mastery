import type { MDXComponents } from "mdx/types";

// Import all MDX components
import { TruthTable } from "@/components/learning/TruthTable";
import { MiniQuiz } from "@/components/learning/MiniQuiz";
import { Callout } from "@/components/learning/Callout";
import { Expandable } from "@/components/learning/Expandable";
import { Definition } from "@/components/learning/Definition";
import { AnimatedDiagram } from "@/components/learning/AnimatedDiagram";
import { LogicExpression } from "@/components/learning/LogicExpression";
import { WorkedProblem, Problem, Step, CommonMistake } from "@/components/examples/WorkedProblem";
import { CheatSheet, Symbol } from "@/components/summary/CheatSheet";
import { ModuleLink } from "@/components/summary/ModuleLink";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Learning components
    TruthTable,
    MiniQuiz,
    Callout,
    Expandable,
    Definition,
    AnimatedDiagram,
    LogicExpression,
    // Examples components
    WorkedProblem,
    Problem,
    Step,
    CommonMistake,
    // Summary components
    CheatSheet,
    Symbol,
    ModuleLink,
    // Override default elements with custom styling
    h1: ({ children }) => (
      <h1 className="font-display text-4xl font-semibold text-charcoal mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-medium text-charcoal mt-10 mb-4 border-b border-border pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-medium text-charcoal mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-slate leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-slate mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-slate mb-4 space-y-2">{children}</ol>
    ),
    code: ({ children }) => (
      <code className="font-mono text-sm bg-parchment px-1.5 py-0.5 rounded text-charcoal">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="font-mono text-sm bg-parchment p-4 rounded-lg overflow-x-auto mb-4 border border-border">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-terracotta pl-4 italic text-slate my-4">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
